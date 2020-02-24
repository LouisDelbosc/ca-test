import React from "react";
import logo from "./logo.svg";
import Router from "./router";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Router />
    </div>
  );
}

export default App;
