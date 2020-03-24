import React from 'react';
import mysql from 'mysql'
import logo from './logo.svg';
import './App.css';

function App() {

  console.log('Hello from Docker!');
  var con = mysql.createConnection({
      host: "db",
      user: "bessy",
      password: "the-cow"
  });
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function waitForConnection() {
      console.log("waiting...")
      await sleep(10000)
      console.log('Testing MySQL connection...');
      con.connect(async function(err) {
          if (err) throw err;
          console.log("Connected!");
      });
  }
  waitForConnection()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to change.
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
    </div>
  );
}

export default App;
