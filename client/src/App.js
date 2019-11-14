import React, { Component } from 'react'
//import './App.css';
import Login from './index';
import Dashboard from './Dashboard';
import Recipe from './Components/Recipes/Recipe.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Recipe name="Barbeque Pecans" image="https://icl.coop/wp-content/uploads/2015/10/BBQ-Pecans.jpg"/>
        {/* <Recipe Name="cat" Description="cute" Image="https://i.ytimg.com/vi/NCZ0eg1zEvw/maxresdefault.jpg"/> */}
        {/* <Dashboard/> */}
      </div>
    );
  }
}

export default App;
