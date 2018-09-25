// contain all api requests

var axios = require('axios');

module.exports = {
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