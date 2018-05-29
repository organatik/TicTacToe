import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


import logo from './logo.svg';
import './App.css';
import Game from './containers/Game/game';
import PlanetsTable from './containers/PlanetsTable/PlanetsTable';



class App extends Component {
  render() {
    const links = ['Game', 'Planets'];
    const routs = [
        {path: '/game', component: Game},
        {path: '/planets', component: PlanetsTable},
    ];
    return (
      <Router>
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                  <nav>
                      {links.map((link) =>
                          <li key={link} >
                              <Link to={'/'+ link.toLowerCase() }>{link}</Link>
                          </li>
                      )}
                  </nav>
              </header>
              {routs.map((rout) =>
                  <Route  key={rout.path} path={rout.path} component={rout.component}  />
              )}
          </div>
      </Router>
    );
  }
}



export default App;
