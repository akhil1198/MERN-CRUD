//package imports
import React, { useState, useEffect, useContext } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom'
import History from 'history'

//local imports
import './App.css';
import Home from './components/Home';
import Landing from './components/Landing'
import {SignUp} from './components/Signup';

export const AuthContext = React.createContext();
const history = createBrowserHistory();



function App() {
  return (
    <div className="App" style={{ backgroundColor: "#ead8bb" }}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>

    </div>
  );
}

export default App;
