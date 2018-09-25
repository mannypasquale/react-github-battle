var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>

            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}

                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )


}

function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular=rank">#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login} 
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}

        </ul>
    )

}


RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

/**
 * Whats Happening with this component
 * 
 * FIRST: establish the initial state
 * 
 * Then we say update langauge to always be called with the correct context and refer
 * to the specific component instance
 * 
 * THEN create Lang array
 * 
 * MAP over array and create a list item for each item in Array
 * whenever each item is clicked on we run updatelanguage passing it
 * the specific language and update state based on that specific language
 */
class Popular extends React.Component {
    // set state so we can highlight and render list of repos bases on selected tab
    // constructor property is a prop of js classes
    // whenever you create a constructor in react call super and pass it PROPS
    constructor(props) {
        super(props);
        this.state = {
            // default state will be ALL
            selectedLanguage: 'All',
            repos: null
        };

        // inside constructor
        // .bind creates new function doesnt invoke
        // we don't know what keyword is bound too till update language is invoked
        // takes in context and returns brand new function with the this keyword inside the
        // function with the THIS keyword BOUND 

        // no matter the context the update language will be bound to correct

        // makes it so this in update language
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    // lifecycle event
    // this will be invoked by react whenver the component is mounted to the screen
    componentDidMount () {
        // this is where we make our ajax requests
        this.updateLanguage(this.state.selectedLanguage);
        

    }

    updateLanguage(lang){
        this.setState(function(){
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
        // we moved this from our compoonent did mount function because it needs to be called everytime that a language is updated with
        // our selection
        api.fetchPopularRepos(lang)
            .then(function (repos) {
                //console.log(repos);
                this.setState(function () {
                    return {
                        repos: repos
                    }
                })
            }.bind(this));
    }
  
    render() {
        return(
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                        onSelect={this.updateLanguage}
                />
                {!this.state.repos
                    ? <p>LOADING</p>
                :
                <RepoGrid repos={this.state.repos} />}
            </div>
        )
    }
}

module.exports = Popular;