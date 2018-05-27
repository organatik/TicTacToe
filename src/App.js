import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


import logo from './logo.svg';
import './App.css';
import Game from './containers/Game/game';
import PlanetsTable from './containers/PlanetsTable/PlanetsTable';



class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                  <nav>
                      <li>
                          <Link to='/game'>
                              Game
                          </Link>
                      </li>
                      <li>
                          <Link to='/planets'>
                              Planets
                          </Link>
                      </li>
                  </nav>
              </header>
              <Route path='/game' component={Game}/>
              <Route path='/planets' component={PlanetsTable}/>
          </div>
      </Router>
    );
  }
}



export default App;
