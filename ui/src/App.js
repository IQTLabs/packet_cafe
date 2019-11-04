import React from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './pages/Upload';
import Navbar from './components/Header';

const uuidv4 = require('uuid/v4');
const SESSION_ID = uuidv4();

function App() {
  return (
    <>
      <Navbar/>
      <Upload sessionId={SESSION_ID}/>
    </>
  );
}

export default App;


 /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/
