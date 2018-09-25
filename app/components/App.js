var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

// class in js a reserved keyword
// className is how we add a class name to a specfic element
class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/popular' component={Popular} />
                        <Route path='/battle/results' component={Results} />
                        <Route render={function () {
                            return <p> Not Found</p>
                        }} />
                    </Switch>


                </div>
            </Router>

        )
    }
}
//export App so that we can REQUIRE it elsewhere
module.exports = App;