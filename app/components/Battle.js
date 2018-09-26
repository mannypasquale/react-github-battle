var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;



/**
 * 
 * this function returns some UI
 * it takes in the props that you sent it below that have avatar, username, onReset and id
 * 
 * it places the img prop into the image tag, puts the username as a header
 * 
 * and most importantly has a reset button that upon click calls the onReset prop which
 * is just the handleReset(id) function with the id of playerOne or playerTwo depending on which 
 * field you entered into
 * 
 */
function PlayerPreview(props) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={'Avatar for ' + props.username}
                />

                <h2 className='username'>@{props.username}</h2>
            </div>
            <button 
                className='reset'
                onClick={props.onReset.bind(null, props.id)}>
                Reset
                </button>
        </div>

    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {

    // if our component is going to have any state to it ie. it updates on the fly then we need to 
    // add a constructor and create the state
    constructor(props) {
        super(props);
        // in this case our state property in this component will only have username
        this.state = {
            username: ''
        }
        // both these functions will use the 'this' keyword to refer to proper instance
        // 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * by using 'this.setState' you are telling this function to update the state above and re-render with 
     * the updated state
     * 
     */
    handleChange(event) {
        // event.target property returns the element that triggered the event
        // in this case the INPUT field
        // then .value grabs the value
        var value = event.target.value;
        //this sets the state 'username' of the current instance with what you have
        // entered into the text field
        this.setState(function() {
            return {
                username: value
            }
        })
    }

    /**
     * This function deals with what happens when you press the submit button on the form
     * 
     */
    handleSubmit(event) {
        // preventDefault method cancel the vent if it is cancelable, 
        // meaning that the default action that belongs to the event will not occur
        // Clocking on "submit" button, prevent it from submitting a form etc
        event.preventDefault();

        // On submit is just a prop!!!!!!!! which has the function
        // handleSubmit(id, username) being passed to this component
        // which grabs the passed along prop id and also the current states username
        // which you will have entered into this component
        // handle submit is what sets the state with the new state that was
        // returned from onSubmit
        this.props.onSubmit(this.props.id, this.state.username)
    }
    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                {/*
                    for the input filed onchange is what gets called everytime the input field changes 
                    obviouslllly and it will call the handlechange function with updates the state 
                    with what is currently in the input field
                */}
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                {/*
                    This button is disabled as long as the username state of this instance is '' empty string
                    only when it's not an empty string can you click the button
                */}
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>

        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    // we want this keyword in the function to always refer to our instance above
    // done with the bind keyword
    handleSubmit(id, username) {
        this.setState(function(){
            var newState = {};
            // newState is an object with id + 'Name' which gives it 
            // the proper state property of this instance
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'http://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
        handleReset(id) {
            this.setState(function () {
                var newState = {};
                // newState is an object with id + 'Name' which gives it 
                // the proper state property of this instance
                newState[id + 'Name'] = '';
                newState[id + 'Image'] = null;
                return newState;
            });
        }
    render() {
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        return(
            <div>
                <div className='row'>

                    {/*
                        only if playerOneName is set in the state will we use the PlayerInput component
                        which has an id, label, and onSubmit prop
                        onsubmit is passed the handlesubmit function here which takes in a id, and username
                        and sets the state of this instance (playerOneName:  and playerOneImage: )
                    */}
                    {!playerOneName &&
                        <PlayerInput 
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit} 
                    />}
                    {/*
                        if playeroneimage state isnt null then we gonna use the PlayerPreview component
                        wtiht the props... onReset is a funciton that returns the state to empty strings
                        and null when you pass it a specific id in this case playerOne because thats what the
                        state needs while adding name and image to the end
                    */}
                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage} 
                            username={playerOneName}
                            onReset={this.handleReset}
                            id='playerOne'
                            />}
                    {!playerTwoName &&
                        <PlayerInput 
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                    />}
                    
                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage} 
                            username={playerTwoName}
                            onReset={this.handleReset}
                            id='playerTwo'
                    />}




                </div>
                {/*
                    Remember the variable p1 and p2 are set above in the render and
                    set to the state of the instance thus if you hadnt changed username yet then its still 
                    an empty string

                    Here we give the link two properties (PROPS) pathname and search
                    pathname is the exact url
                    PATHNAME is the string representation to the path to link to
                        --> this we have to go into app.js and add a new route with that path...
                                in this case it's battle/results
                */}
                {playerOneImage && playerTwoImage &&
                <Link   
                    className='button'
                    to={{
                        pathname: match.url + '/results',
                        search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName                       
                    }}>
                    Battle
                
                </Link>}
            </div>
        )
    }
}

module.exports = Battle;