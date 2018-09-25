var React = require('react');

// Just absolute fundamentals you need to create anchor tag
//var Link = require('react-router-dom').Link;

// navlink is for when you want to dynamically change the style of the ancor tag based on whether that
// route is active --> bold when you clicked it
var NavLink = require('react-router-dom').NavLink;
function Nav () {
    // because the '/' for Home will be active whenever router is at '/' then it will be bold
    // regardless of the /battle because its there
    // to FIX we add 'exact' to it so that only when its at '/' route will it be active
    return(
    <ul className="nav">  
        <li>
            <NavLink exact activeClassName='active' to='/'>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName='active' to='/battle' >
                Battle
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName='active' to='/popular' >
                Popular
            </NavLink>
        </li>
    </ul>
    )
}


module.exports = Nav;