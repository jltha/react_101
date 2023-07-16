import logo from './logo.svg';
import './App.css';
import Item from './MyItem';
import StarWars1 from './StarWars1'
import StarWars2 from './StarWars2'

import React from 'react';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        
        <Item name="Thompson"/>
        <Item name="Gully"/>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        {/* <StarWars1 /> */}
        <StarWars2 />
      </header>
    </div>
  );
}

export default App;
