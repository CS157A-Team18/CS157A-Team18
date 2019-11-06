import React, { Component } from 'react'
import './App.css';
import Login from './index';
import Dashboard from './Dashboard';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Dashboard/>
      </div>
    );
  }
}

export default App;
