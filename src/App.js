import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RechercheLivre from "./RechercheLivre.js";
import withAuth from "./JWTAuthentication/withAuth.js";
import AuthService from "./JWTAuthentication/AuthService.js";
import Emprunts from "./Emprunts";

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
    dataUser : []
  
  };

  resetState = () => {
    this.setState({
      showEmprunts: false,
      showRechercheLivre: false
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
      showEmprunts : true
    })
  }

  afficherFiltre =() => {
    this.resetState();
    this.setState({
      showRechercheLivre : true
    })
  }


// récupération des infos de l'utilisateur (nom, prébnom, id)
getInfosUser = async () =>{
  const reponse = await fetch(
    "http://localhost:8080/api/Membre/data/" +
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
          <div><button style={{ color: "red" }} onClick={this.handleLogout}>
            Se déconnecter
          </button>
          <button onClick={this.afficherFiltre}>Rechercher un ouvrage</button>
          <button onClick={this.afficherEmprunts}>Mes emprunts</button></div>

          <div>
            <h1>Bienvenu(e) {this.state.dataUser.prenom} {this.state.dataUser.nom} dans votre Bibliothèque !</h1>
          </div>

          {this.state.showEmprunts && <Emprunts />}

          {this.state.showRechercheLivre && <RechercheLivre />}

          <div>Ce site web a été construit avec ReactJS <span><img src={logo} className="App-logo" alt="logo" /></span></div>

        </header>
      </div>
    );
  }
}

export default withAuth(App);
