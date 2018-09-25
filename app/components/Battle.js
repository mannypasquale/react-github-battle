var React = require('react');
var PropTypes = require('prop-types');

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
     * @param {*} event 
     */
    handleChange(event) {
        // event.target property returns the element that triggered the event
        // in this case the INPUT field
        // then .value grabs the value
        var value = event.target.value;
        console.log(value);
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
     * @param {*} event 
     */
    handleSubmit(event) {
        // preventDefault method cancel the vent if it is cancelable, 
        // meaning that the default action that belongs to the event will not occur
        // Clocking on "submit" button, prevent it from submitting a form etc
        event.preventDefault();

        //On submit is just a prop!!!!!!!! which has the function
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
                <input
                id='username'
                placeholder='github username'
                type='text'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
                />
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
    }
    // we want this keyword in the function to always refer to our instance above
    // done with the bind keyword
    handleSubmit(id, username) {
        this.setState(function(){
            var newState = {};
            // newState is an object with id + 'Name' which gives it 
            // the proper state property of this instance
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'http://gibhub.com/' + username + '.png?size=200';
            return newState;
        });
    }
    render() {
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;

        return(
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput 
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit} 
                    />}
                    {!playerTwoName &&
                        <PlayerInput 
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                    />}
                </div>
            </div>
        )
    }
}

module.exports = Battle;