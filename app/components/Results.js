var React = require('react');
var api = require('../utils/api');
api.getProfile('mannypasquale');
var test = api.getRepos('mannypasquale').then(function(pop){
    console.log(pop.data[0]);
});
class Results extends React.Component {
    

    render() {
        return (
            <div>Results</div>
        )
    }
}

module.exports = Results;