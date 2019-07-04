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
  }
  state = {
    showDashBoard: false,
    showRechercheLivre: false
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
            <h1>Bienvenu(e) dans votre Bibliothèque !</h1>
          </div>
          <h2>Welcome {this.props.user.email}</h2>
          <p>Ce site web a été construit avec ReactJS</p>

          {this.state.showDashBoard && <Dashboard />}

          {this.state.showRechercheLivre && <RechercheLivre />}
        </header>
      </div>
    );
  }
}

export default withAuth(App);
