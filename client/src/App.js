import React, { Component } from 'react'
import './App.css';
import Login from './index';

class App extends Component {
  state = { users: [] }

  componentDidMount() {
    // Retrieves data from /users in the backend
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState( { users }));
  }

  render() {
    return (
      <div className="App">
        <Login/>
        <h1>Users</h1>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.username}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
