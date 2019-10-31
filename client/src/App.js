import React, { Component } from 'react'
import './App.css';
import Login from './index';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <div class="tab">
          <button class="tablinks" onclick="openCity(event, 'Home')">Home</button>
        </div>
        <div id="Home" class="tabcontent">
          <h3>Discover recipes suitable for you.</h3>
          <img src="images/salad.jpg" height="200" width="300"></img>
        </div>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.username}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
