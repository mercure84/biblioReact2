import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./DashBoard.js";
import RechercheLivre from "./RechercheLivre.js";
import withAuth from "./JWTAuthentication/withAuth.js";
import AuthService from "./JWTAuthentication/AuthService.js";

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
    showDashBoard: false,
    showRechercheLivre: false,
    dataUser : []
  
  };

  resetState = () => {
    this.setState({
      showDashBoard: false,
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
      showDashBoard : true
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
    "http://localhost:8080/Membre/data/" +
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
}



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button style={{ color: "red" }} onClick={this.handleLogout}>
            Se déconnecter
          </button>
          <button onClick={this.afficherFiltre}>Rechercher un ouvrage</button>
          <button onClick={this.afficherEmprunts}>Mes emprunts</button>

          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Bienvenu(e) {this.state.dataUser.prenom} {this.state.dataUser.nom} dans votre Bibliothèque !</h1>
          </div>
          <p>Ce site web a été construit avec ReactJS</p>

          {this.state.showDashBoard && <Dashboard />}

          {this.state.showRechercheLivre && <RechercheLivre />}
        </header>
      </div>
    );
  }
}

export default withAuth(App);
