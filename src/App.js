import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './DashBoard.js';
import RechercheLivre from './RechercheLivre.js'
import AuthService from './JWTAuthentication/AuthService';
import withAuth from './JWTAuthentication/withAuth';
import LoginForm from './LoginForm';
const Auth = new AuthService();




class App extends React.Component{

  constructor(props) {
    super(props);
   
  }
  state = {
    showDashBoard: false,
    showRechercheLivre: false,
  };

  resetState = () =>{
    this.setState({
      showDashBoard: false,
      showRechercheLivre: false,
    })}

    handleLogout(){
      Auth.logout()
      this.props.history.replace('/login');
   }

  
  render (){
    return(

    <div className="App">
      <header className="App-header">
      <LoginForm />
        <div>

      <img src={logo} className="App-logo" alt="logo" /><h1>Bienvenu(e) dans votre Bibliothèque !</h1>
      </div>
      <h2>Welcome {this.props.user.username}</h2>
      <p>Ce site web a été construit avec ReactJS</p>



      {this.state.showDashBoard &&<Dashboard />}

      {this.state.showRechercheLivre&& <RechercheLivre />}

       
      </header>
    </div>
  
)}}

export default withAuth(App);
