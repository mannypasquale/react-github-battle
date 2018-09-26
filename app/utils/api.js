// contain all api requests

var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;


function getProfile(username) {
  // this will return us an object with a .then property on it
  // go ahead and get this info!!! and when its done!!! call the following funciton
  // and pass it the 
  return axios.get('https://api.github.com/users/' + username)
    .then(function (user){
      console.log(user.data);
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + '?per_page=100');
  
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}
module.exports = {

    battle: function (players) {
      return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
    },
    getProfile,
    getRepos,
    fetchPopularRepos: function (language) {
        //.encode uri so that all human readable characters become weird tings
      var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
        // have specific url we need to hit
        // returns a 'promise' and then call a .then gets invoked after the get has been resolved and pass the response 
        // and return the response
      return axios.get(encodedURI)
        .then(function (response) {
          return response.data.items;
        });
    }
  };


  // somewhere in the app we will use the fetchPopularRepos('java' etct