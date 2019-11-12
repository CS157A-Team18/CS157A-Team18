import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './index';
import Dashboard from './Dashboard';
import Profile from './Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
