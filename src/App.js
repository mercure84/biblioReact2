import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RechercheLivre from "./RechercheLivre.js";
import withAuth from "./JWTAuthentication/withAuth.js";
import AuthService from "./JWTAuthentication/AuthService.js";
import Emprunts from "./Emprunts";
import Accueil from "./Accueil"
import {urlServiceApi} from './configJM';


const Auth = new AuthService();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
    this.afficherFiltre = this.afficherFiltre.bind(this);
    this.afficherEmprunts = this.afficherEmprunts.bind(this);
    this.getInfosUser();
  }
  state = {
    showEmprunts: false,
    showRechercheLivre: false,
    showAccueil: true,

    dataUser : []
  
  };

  resetState = () => {
    this.setState({
      showEmprunts: false,
      showRechercheLivre: false,
      showAccueil: true,

    });
  };

  ///LOGOUT

  handleLogout() {
    this.Auth.logout();
    localStorage.clear();
    this.props.history.replace("/login");
  }

  afficherEmprunts = () => {
    this.resetState();
    this.setState({
      showAccueil: false,
      showEmprunts : true
      
    })
  }

  afficherFiltre =() => {
    this.resetState();
    this.setState({
      showAccueil: false,
      showRechercheLivre : true
    })
  }



// récupération des infos de l'utilisateur (nom, prébnom, id)
getInfosUser = async () =>{
  const reponse = await fetch(
    urlServiceApi + "Membre/data/" +
            localStorage.getItem("email"),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.Auth.getToken()
      }
    }
  );

  const resultat = await reponse.json()
  this.setState({
    dataUser : resultat
  })

  localStorage.setItem("nom", this.state.dataUser.nom);
  localStorage.setItem("prenom", this.state.dataUser.prenom);
  localStorage.setItem("userId", this.state.dataUser.id);
}



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
          <button onClick={this.resetState}>🏠</button>
          <button onClick={this.afficherFiltre}>Rechercher un ouvrage</button>
          <button onClick={this.afficherEmprunts}>Mes emprunts</button>
          <button style={{ color: "red" }} onClick={this.handleLogout}>
            Se déconnecter
          </button></div>

          <div>
            <h1>Bienvenu(e) {this.state.dataUser.prenom} {this.state.dataUser.nom} à la Bibliothèque des Chartreux !</h1>
          </div>

          {this.state.showAccueil && <Accueil />}

          {this.state.showEmprunts && <Emprunts />}

          {this.state.showRechercheLivre && <RechercheLivre />}

          <br></br>

          <div>Ce site web a été construit avec ReactJS <span><img src={logo} className="App-logo" alt="logo" /></span></div>

        </header>
      </div>
    );
  }
}

export default withAuth(App);
