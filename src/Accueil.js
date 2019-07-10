import React, { Component } from "react";
import { urlServiceApi } from "./configJM";


class Accueil extends Component {
  constructor(props) {
    super(props);
    this.getInfoBiblio();
  }

  state = {
    nbLivres: 0,
    nbLivresDispo: 0
  };

  getInfoBiblio = async () => {
    const reponse = await fetch(urlServiceApi + "Livre/nbLivres", {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    const result = await reponse.json();
    this.setState({
      nbLivres: result.nbLivres,
      nbLivresDispo: result.nbLivresDispo
    });
  };

  render() {
    return (
      <div>
        <h2>Horaires d'accueil :</h2>
        <p>2 rue du Clos Meunier 92130 Issy Les Moulineaux</p>

        <table>
          <tbody>
            <tr>
              <td>Lundi :</td>
              <td>Fermé</td>
            </tr>
            <tr>
              <td>Mardi :</td>
              <td>14h - 19h</td>
            </tr>
            <tr>
              <td>Mercredi :</td>
              <td>14h - 19h</td>
            </tr>
            <tr>
              <td>Jeudi :</td>
              <td>14h - 19h</td>
            </tr>
            <tr>
              <td>Vendredi :</td>
              <td>14h - 19h</td>
            </tr>
            <tr>
              <td>Samedi :</td>
              <td>9h - 17h</td>
            </tr>
            <tr>
              <td>Dimanche :</td>
              <td>Fermé</td>
            </tr>
          </tbody>
        </table>

        <br />

        <p>
          Il y a actuellement {this.state.nbLivres} livres dans la bibliothèque, {this.state.nbLivresDispo} sont disponibles.</p>
      </div>
    );
  }
}
export default Accueil;
