import React from 'react';
import './App.css';
import ReadContent from './ReadContent';
import logo from './Farm.png';

export default function App(){
  const buttonStyle = {
    marginRight: '10px',
    backgroundColor: '#2593F2',
    border: '1px solid black',
    boxShadow: '2px 2px blue',
    borderRadius: '5px'
   };
   const logoStyle = {
     border: '1px solid black',
     backgroundColor: '#2593F2',
     color: 'white',
     marginRight: '1100px',
     paddingTop: '60px',
     align: 'center',
     borderRadius: '5px',
     boxShadow: '2px 2px blue'
   };
  return(
    <div class = "pageColor">
      <div class = 'nav'>
          <a style = {logoStyle}><img src={logo} className="App-logo" alt="logo" /></a>
          <button style = {buttonStyle}> <a className = "buttons">Home</a></button>
          <button style = {buttonStyle}> <a className = "buttons">Help</a> </button>
          <button style = {buttonStyle}> <a className = "buttons">Inbox</a> </button>
      </div>
      <div class = 'content'>
        <h1>Your Reviews:</h1>
        <ReadContent /> 
      </div>
      <div class = "filler"></div>
    </div>
  )
}