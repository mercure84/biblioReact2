import React from "react";
import './LoginForm.css';
import AuthService from './JWTAuthentication/AuthService.js'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this);
    this.Auth = new AuthService();

    
  }

  state = {
    showSignInForm: false,
    showSignUpForm: false,
    error : null,
    isLoaded : true,
    reponsePost : [],
    nouveauMembreOK : false,
    bugSignUp : false,
    bugLogIn : false,
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


  // fonction submit du formulaire Login ---------------------------------
  async handleSubmitLogIn(event) {

    this.setState({
      isLoaded:false,
      bugSignUp : false
    })
    
    event.preventDefault();
    const data = {
      username : event.target.email.value,
      password : event.target.encryptedPassword.value
    }
    
    
    try{
      const seConnecter = await fetch('http://localhost:8080/login', {
      method: 'GET',
      headers:{
        'Content-Type': 'x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${data.username}:${data.password}`)}`,
        }
    });
    const reponsePost = seConnecter.text();

    this.setState({
    isLoaded : true,
    showSignInForm: false,
    showSignUpForm: false,
    bugLogIn : false

    });

  
  } 
    
    catch (error){
this.setState({
  isLoaded:true,
  bugLogIn : true,
  error });
}

    }
//---------------------------------------


    // fonction submit du formulaire SIgnup
    async handleSubmitSignUp(event) {

      this.setState({
        isLoaded:false,
      })
      
      event.preventDefault();
      const data = {
        nom : event.target.nom.value,
        prenom : event.target.prenom.value,
        email : event.target.email.value,
        password : event.target.password.value,
        repassword : event.target.repassword.value
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


      // SOUMISSION DU FORMULAIRE LOGIN 

      handleFormSubmit(e){
             e.preventDefault();
           
             this.Auth.login(this.state.username,this.state.password)
                 .then(res =>{
                    this.props.history.replace('/');
                 })
                 .catch(err =>{
                     alert(err);
                 })
         }



  render() {
    return (
      <div id="connexion" className="vue">

{!this.state.isLoaded &&<p>En chargement...</p>}
{this.state.nouveauMembreOK &&<p id="nouveauMembre">Vous avez bien été enregistré !</p>}
{this.state.bugSignUp &&<p id="bugSignUp">Un problème est apparu dans l'enregistrement... : {this.error}</p>}
{this.state.bugLogIn &&<p id="bugLogIn">Un problème est apparu dans la tentative de login... : {this.error}</p>}




        <button onClick={this.afficherSignInForm}>Se connecter</button>
        <button onClick={this.afficherSignUpForm}>S'inscrire</button><span onClick={()=>{this.setState({
          showSignInForm: false,
          showSignUpForm: false,
          bugSignUp : false
        })}}>🙀</span>
                <button style={{color : 'red'}}>Se déconnecter</button>


        {this.state.showSignUpForm &&<form id="signUpForm" onSubmit={this.handleSubmitSignUp}>
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

          <tr>
            <td>
              <label htmlFor="password">Mot de passe </label>
            </td>
            <td>
              <input type="password" id="password" name="password"/>
            </td>
          </tr> 

          <tr>
            <td>
              <label htmlFor="repassword">Confirmer le mot de passe</label>
            </td>

            <td>
              <input type="password" id="repassword" name="repassword"  required />
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
     

{this.state.showSignInForm && <form id="signInForm" onSubmit={this.handleSubmitLogIn}>
<label htmlFor="username">Votre adresse email </label>
<input type="text" id="username" name="username" required />
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
