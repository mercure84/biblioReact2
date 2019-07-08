import React, { Component } from "react";
import AuthService from "./JWTAuthentication/AuthService.js";
import searchingLogo from "./searching.svg";
import "./Emprunts.css";


const Auth = new AuthService();

class Emprunts extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.afficherEmprunts();
    this.prolonger = this.prolonger.bind(this);

  }

  state = {
    isLoaded: false,
    listeEmprunts: []
  };


  async prolonger(emprunt){
    console.log("On veut prolonger l'emprunt n° : " + emprunt.id);
    this.setState({
      isLoaded : false
    })
    const reponse = await fetch(
      "http://localhost:8080/api/prolongerEmprunt/"+emprunt.id,{
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.Auth.getToken()
        }

      }
    );

    const resultat = await reponse.json();
    this.setState({
      isLoaded: true,
  });
  this.afficherEmprunts();
    

  }

  afficherEmprunts = async () => {
    const reponse = await fetch(
      "http://localhost:8080/api/EmpruntsMembre/" + localStorage.getItem("userId"),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.Auth.getToken()
        }
      }
    );

    const resultat = await reponse.json();
    this.setState({
        isLoaded: true,
      listeEmprunts: resultat
    });
  };

  static dateOptions = {year: "numeric", month: "long", day: "numeric"};

  
  render() {
    return (
      <div className="vue">
{!this.state.isLoaded && <img src={searchingLogo} className="Searching-logo" alt="searching-Logo" />}

{((this.state.listeEmprunts.length == 0) && (this.state.isLoaded)) && <span>"Vous n'avez aucun emprunt de livre en cours :(</span> }
        {this.state.listeEmprunts.length != 0 && (
          <div id="listeEmprunts">
            <h2> Vos emprunts en cours : </h2>
            <table>
              <thead>
                <tr>
                  <th>Livre</th>
                  <th>Date d'emprunt</th>
                  <th>Date limite de restitution</th>
                  <th>Restitué</th>
                  <th>Prolongé</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listeEmprunts.map(emprunt => (
                  <tr key={emprunt.id}>
                    <td>{emprunt.livre.titre}</td>
                    <td>{new Date(emprunt.debutDate).toLocaleString('fr-FR', Emprunts.dateOptions)}</td>
                    <td>{new Date(emprunt.finDate).toLocaleString('fr-FR', Emprunts.dateOptions)}</td>
                    <td>{emprunt.rendu ? <span>Oui</span> : <span>Non</span>}</td>
                    <td><span>{emprunt.prolonge ? <span>Oui</span> : <span>Non</span>}</span><span> {!(emprunt.prolonge || emprunt.rendu) && <button onClick={()=>this.prolonger(emprunt)}>+4sem.</button>}</span></td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
export default Emprunts;
