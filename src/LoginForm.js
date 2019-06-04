import React from "react";
import './loginForm.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  state = {
    showSignInForm: false,
    showSignUpForm: false,
    error : null,
    isLoaded : true,
    reponsePost : [],
    nouveauMembreOK : false,
    bugSignUp : false
  };

  resetState = () =>{
    this.setState({
      error : null,
      isLoaded : true,
      reponsePost : [],
      nouveauMembreOK : false

    })




  }

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

  async handleSubmit(event) {

    this.setState({
      isLoaded:false,
      bugSignUp : false
    })
    
    event.preventDefault();
    const data = {
      nom : event.target.nom.value,
      prenom : event.target.prenom.value,
      email : event.target.email.value,
      encryptedPassword : event.target.encryptedPassword.value
    }

    try{
    const dataJson = JSON.stringify(data);
    console.log(dataJson);
      const ajouterMembre = await fetch('http://localhost:8080/ajouterMembre', {
      method: 'POST',
      body: dataJson,
      headers:{
        'Content-Type': 'application/json'}
    });
    const reponsePost = ajouterMembre.json();
    //console.log("le membre " + data.nom + " a été posté !");

    this.setState({
    isLoaded : true,
    showSignInForm: false,
    showSignUpForm: false,
    nouveauMembreOK : true,
    bugSignUp : false
    });

  
  } 
    
    catch (error){
this.setState({
  isLoaded:true,
  bugSignUp : true,
  error });
}

    }


  render() {
    return (
      <div id="connexion" className="vue">

{!this.state.isLoaded &&<p>En chargement...</p>}
{this.state.nouveauMembreOK &&<p id="nouveauMembre">Vous avez bien été enregistré !</p>}
{this.state.bugSignUp &&<p id="bugSignUp">Un problème est apparu... : {this.error}</p>}



        <button onClick={this.afficherSignInForm}>Se connecter</button>
        <button onClick={this.afficherSignUpForm}>S'inscrire</button><span onClick={()=>{this.setState({
          showSignInForm: false,
          showSignUpForm: false,
          bugSignUp : false
        })}}>🙀</span>
                <button style={{color : 'red'}}>Se déconnecter</button>


        {this.state.showSignUpForm &&<form id="signUpForm" onSubmit={this.handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="nom">Nom</label>
            </td>
            <td>
              <input type="text" id="nom" name="nom" required />
            </td> 
          </tr>
          <tr>
            <td>
              <label htmlFor="prenom">Prénom</label>
            </td>
            <td>
              <input type="text" id="prenom" name="prenom" required />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email">Adresse email </label>
            </td>
            <td>
              <input type="text" id="email" name="email" required />
            </td>
          </tr>

          {/* <tr>
            <td>
              <label htmlFor="password">Mot de passe </label>
            </td>
            <td>
              <input type="password" id="password"/>
            </td>
          </tr> */}

          <tr>
            <td>
              <label htmlFor="encryptedPassword">Confirmer le mot de passe</label>
            </td>

            <td>
              <input type="password" id="encryptedPassword" name="encryptedPassword"  required />
            </td>
          </tr>

          <tr>
            <td />
            <td>
              <button>S'enregistrer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>}
     

{this.state.showSignInForm && <form id="signInForm" action="#">
<label htmlFor="email1">Votre adresse email </label>
<input type="text" id="email1" name="email1" required />
<br />
<label htmlFor="password">Votre mot de passe </label>

<input type="password" id="password" name="password" required />
<br />
<button type="submit">Connexion</button>
</form>}

</div>

    );
  }

}

export default LoginForm;
