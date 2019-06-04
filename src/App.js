import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm.js';
import Dashboard from './DashBoard.js';
import RechercheLivre from './RechercheLivre.js'
import Emprunts from './Emprunts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <LoginForm />
      <img src={logo} className="App-logo" alt="logo" /><h1>Bienvenu(e) dans votre Bibliothèque !</h1>
      </div>
      <p>Ce site web a été construit avec ReactJS</p>

      

      <Dashboard />

      <RechercheLivre />

      <Emprunts />
      
        
      </header>
    </div>
  );
}

export default App;
