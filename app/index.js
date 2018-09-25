// var React = require('react');//want to use react we need to require it
// var ReactDOM = require('react-dom');//also need react dom because we will be rendering the component we make through the dom
// require('./index.css');// setpup webpack setting so we reuqire css file ..now all css we include will be included into application when its bundled


// //moder way to create a component is js classes
// //
// // component may have lifecycle so when events happen in your component things happen (add remove from screen) property to associate with component
// // UI is MOST IMPORTANT might not have state or lifecycle events but component always has UI part of it
// // set UI with render method
// class App extends React.component {
// 	//whatever render method returns will be the specific UI for this component
// 	render() {
// 		return (
// 		  //this looks like html but its actually jsx  not valid js syntax but when it goes through babel it will be changed into something
// 			//that looks like this...you dont have to write out ui all weird but just use jsx to describe interface of our component
// 			// without haveing to write out the raw javascript
// 		  <div>
// 			Hello World!
// 		  </div>
// 		)
// 	}
// }


// // take componetn and render it to the DOM
// // Defined a component above! ^^^^^
// // HOW WE USE A REACT COMPONENT DOE??
// 	// <App />  JSX this tells react to use component


// ReactDOM.render(
// 	<App />,
// 	// pass react dom render the App component
// 	// select element that has id of app
// 	// with html template we will have div in there with id of App!!
// 	// BUUUUT we need to transpile jsx so go to install some swag babel/webpack to do it
// 	document.getElementById('app')

// );

// var React = require('react');
// var ReactDOM = require('react-dom');
// require('./index.css');
// var PropTypes = require('prop-types');

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Team Roster!</h1>
//         <ul>
//           {this.props.userList.map(function(name){
//             return <li key={name}> {name} </li>;
//           })}
//         </ul>  
//       </div>
//     )
//   }
// }
// App.propTypes = {
//   userList: PropTypes.array.isRequired
// }
// ReactDOM.render(
//   <App userList={["Manny", "Eric", "Josh", "Sheldon"]} />,
//   document.getElementById('app')
// );

// where is this function invoked

// var sayName = function(name){
//   console.log('Hello, ' + name);
// };

// Implicit binding!!!!

// var me = {
//   name: "Manny",
//   age: "27",
//   sayName: function() {
//     console.log(this.name);
//   }
// };

// me.sayName();

// when function is invoked and left of the dot thats what the this keyword references

// var sayNameMixin = function(obj){
//   obj.sayName = function(){
//     console.log(this.name);
//   };
// };

// var me = {
//   name: "Manny",
//   age: 24=,
// };

// var you  = {
//   name: 'Tyler',
//   age: 23
// };

// sayNameMixin(me);
// sayNameMixin(you);

// var Person = function(name, age){
//   return {
//     name: name,
//     age: age,
//     sayName: function(){
//       console.log(this.name);
//     },
//     mother: {
//       name: 'Stacey',
//       sayName: function(){
//         conosle.log(this.name)
//       }
//     }
//   };
// };

// var jim = Person('Jim', 42);
// jim.sayName();
// jim.mother.sayName(); --> left of the dot so the this will be mother and thats what the this keyword will be referencing

/*

plain function in global scope
call the function in the context of stacey

all functions have a .Call method
this will reference stacey

explicit stating this keyword is

.call pass one by one
.apply pass in an array
.bind creates a new funciton instead of invoking the function immediately
*/

// var sayName = function(lang1, lang2, lang3){
//   console.log('My name is ' + this.name + ' and i know'+ lang1 + ' ' + lang2 + ' ' + lang3);
// };

// var stacey = {
//   name: 'Stacey',
//   age: 34
    
//   };

// var languages = ['Js', 'Ruby', 'Python'];

//sayName.call(stacey,languages[0], languages[1], languages[2]);

//sayName.apply(stacey, languages);

//  var newFn = sayName.bind(stacey,languages[0], languages[1], languages[2]);
// newFn();
//.bind returns a new function


// New Binding
// when function invoked new binding
// keyword the this keyword inside the funciton is bound to the new object 
// being constructed
// var Animal = function(color, name, type){
//   // js will create new object for us and save as {}
//   this.color = color;
//   this.name = name;
//   this.type = type
// };

// var zebra = new Animal('Black and White', 'Zorro', 'Zebra');


// Window binding

// var sayAge = function(){
//   'use strict';
//   console.log(this.age);
// };
// var me = {
//   age: 25
// };

// sayAge();





var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');


// Move the below to a components folder

// we only want the index.js file to REQUIRE THE MAIN APP and render it
var App = require('./components/App');


// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Team Roster!</h1>
//         <ul>
//           {this.props.userList.map(function(name){
//             return <li key={name}> {name} </li>;
//           })}
//         </ul>  
//       </div>
//     )
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
