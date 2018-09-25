var React = require('react');
var Link = require('react-router-dom').Link;


class Home extends React.Component {
  render() {

    return (
      <div className="home-container" >
        <h1>Github Battle: Battle your friends... and stuff.</h1>

        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>


    )
  }
}

// function Title (){
//     return (
//         <h1 className="home-title">
//         Github Battle: Battle your friends... and stuff.
//         </h1>
//     )
// }

// function Button () {
//     return (
//         <button className="battle-button" onClick='/battle'>
//             <Link to='/battle'>
//                 Battle
//             </Link>
            
//         </button>
//     )
// }


module.exports = Home;