var React = require('react');//want to use react we need to require it
var ReactDOM = require('react-dom');//also need react dom because we will be rendering the component we make through the dom
require('./index.css');// setpup webpack setting so we reuqire css file ..now all css we include will be included into application when its bundled


//moder way to create a component is js classes
//
// component may have lifecycle so when events happen in your component things happen (add remove from screen) property to associate with component
// UI is MOST IMPORTANT might not have state or lifecycle events but component always has UI part of it
// set UI with render method
class App extends React.component {
	//whatever render method returns will be the specific UI for this component
	render() {
		return (
		  //this looks like html but its actually jsx  not valid js syntax but when it goes through babel it will be changed into something
			//that looks like this...you dont have to write out ui all weird but just use jsx to describe interface of our component
			// without haveing to write out the raw javascript
		  <div>
			Hello World!
		  </div>
		)
	}
}


// take componetn and render it to the DOM
// Defined a component above! ^^^^^
// HOW WE USE A REACT COMPONENT DOE??
	// <App />  JSX this tells react to use component


ReactDOM.render(
	<App />,
	// pass react dom render the App component
	// select element that has id of app
	// with html template we will have div in there with id of App!!
	// BUUUUT we need to transpile jsx so go to install some swag babel/webpack to do it
	document.getElementById('app')

);

