import React from "react";
import "./LoginForm.css";
import AuthService from "./JWTAuthentication/AuthService.js";
import { urlServiceApi } from "./configJM";
import searchingLogo from "./searching.svg";

const Auth = new AuthService();

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Auth = new AuthService();
  }

  state = {
    showSignInForm: false,
    showSignUpForm: false,
    error: null,
    isLoaded: true,
    reponsePost: [],
    nouveauMembreOK: false,
    loginOK: false,
    bugSignUp: false,
    loginKO: false
  };

  resetState = () => {
    this.setState({
      error: null,
      isLoaded: true,
      reponsePost: [],
      nouveauMembreOK: false,
      bugSignUp: false,
      loginKO: false
    });
  };

  afficherSignInForm = () => {
    //console.log("le bouton se connecter a été cliqué !!!");
    this.setState({ showSignInForm: true, showSignUpForm: false });
    this.resetState();
  };

  afficherSignUpForm = () => {
    //console.log("le bouton s'inscrire a été cliqué !!!");
    this.setState({ showSignInForm: false, showSignUpForm: true });
    this.resetState();
  };

  // fonction submit du formulaire Login ---------------------------------
  async handleSubmitLogIn(e) {
    this.resetState();

    this.setState({
      isLoaded: false,
      bugSignUp: false
    });
    e.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          loginOK: true,
          isLoaded: true
        });
        localStorage.setItem("email", this.state.email);
        this.props.history.replace("/home");
      })
      .catch(err => {
        this.setState({
          loginKO: true,
          isLoaded: true
        });
      });
  }
  //--------------------------------------- fin submit login

  // fonction submit du formulaire SIgnup
  async handleSubmitSignUp(event) {
    this.resetState();

    this.setState({
      isLoaded: false
    });

    event.preventDefault();
    const data = {
      nom: event.target.nom.value,
      prenom: event.target.prenom.value,
      email: event.target.email.value,
      password: event.target.password.value,
      repassword: event.target.repassword.value
    };
    try {
      const dataJson = JSON.stringify(data);
      console.log(dataJson);
      const ajouterMembre = await fetch(urlServiceApi + "ajouterMembre", {
        method: "POST",
        body: dataJson,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const reponsePost = ajouterMembre.json();
      //console.log("le membre " + data.nom + " a été posté !");
      this.setState({
        isLoaded: true,
        showSignInForm: false,
        showSignUpForm: false,
        nouveauMembreOK: true,
        bugSignUp: false
      });
    } catch (error) {
      this.setState({
        isLoaded: false,
        bugSignUp: true,
        nouveauMembreOK: false,
        error
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div id="connexion" className="vue">
        <div className="loginChoice">
          <h2>Connectez vous pour accéder à votre compte Bibliothèque ! 📚</h2>
          {!this.state.isLoaded && (
            <div>
              {" "}
              <img
                src={searchingLogo}
                className="Searching-logo"
                alt="searching-Logo"
              />
            </div>
          )}
          {this.state.nouveauMembreOK && (
            <p id="nouveauMembre">Vous avez bien été enregistré !</p>
          )}
          {this.state.loginOK && <p id="loginOK">Vous êtes connecté !</p>}
          {this.state.loginKO && (
            <p id="loginKO">
              Un problème est apparu dans la tentative de login, veuillez
              recommencer!
            </p>
          )}

          {this.state.bugSignUp && (
            <p id="bugSignUp">
              Un problème est apparu dans l'enregistrement, veuillez
              recommencer!
            </p>
          )}

          <button onClick={this.afficherSignInForm}>Se connecter</button>
          <button onClick={this.afficherSignUpForm}>S'inscrire</button>
          <span
            onClick={() => {
              this.setState({
                showSignInForm: false,
                showSignUpForm: false,
                bugSignUp: false
              });
            }}
          >
            🙀
          </span>
        </div>
        {this.state.showSignUpForm && (
          <form id="signUpForm" onSubmit={this.handleSubmitSignUp}>
            <label htmlFor="nom">Nom</label>

            <input type="text" id="nom" name="nom" required />
            <br />

            <label htmlFor="prenom">Prénom</label>

            <input type="text" id="prenom" name="prenom" required />
            <br />

            <label htmlFor="email">Adresse email </label>

            <input type="text" id="email" name="email" required />
            <br />

            <label htmlFor="password">Mot de passe </label>

            <input type="password" id="password" name="password" />
            <br />

            <label htmlFor="repassword">Confirmer le mot de passe</label>

            <input type="password" id="repassword" name="repassword" required />
            <br />

            <button>S'enregistrer</button>
          </form>
        )}

        {this.state.showSignInForm && (
          <form id="signInForm" onSubmit={this.handleSubmitLogIn}>
            <label htmlFor="email">Votre adresse email </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={this.handleChange}
              required
            />
            <br />
            <label htmlFor="password">Votre mot de passe </label>

            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              required
            />
            <br />
            <button type="submit">Connexion</button>
          </form>
        )}
      </div>
    );
  }
}

export default LoginForm;
