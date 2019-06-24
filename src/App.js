import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm.js';
import Dashboard from './DashBoard.js';
import RechercheLivre from './RechercheLivre.js'
import Emprunts from './Emprunts';




class App extends React.Component{

  constructor(props) {
    super(props);
   
  }
  state = {
    showDashBoard: false,
    showRechercheLivre: false,
    showLoginForm : true,
  };

  resetState = () =>{
    this.setState({
      showDashBoard: false,
      showRechercheLivre: false,
    })}
  
  render (){
    return(
    <div className="App">
      <header className="App-header">
        <div>

      {this.state.showLoginForm &&<LoginForm />}

      <img src={logo} className="App-logo" alt="logo" /><h1>Bienvenu(e) dans votre Bibliothèque !</h1>
      </div>
      <p>Ce site web a été construit avec ReactJS</p>



      {this.state.showDashBoard &&<Dashboard />}

      {this.state.showRechercheLivre&& <RechercheLivre />}


      <Emprunts />

       
      </header>
    </div>
  
)}}

export default App;
