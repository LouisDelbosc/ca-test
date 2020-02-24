import React from 'react';
import logo from './logo.svg';
import {Welcome} from "./pages/welcome";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Welcome />
    </div>
  );
}

export default App;
