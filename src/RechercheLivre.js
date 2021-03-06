import React from "react";
import searchingLogo from "./searching.svg";
import AuthService from "./JWTAuthentication/AuthService.js";
import {urlServiceApi} from './configJM';


function RandomLivre({ livreRandom }) {

  return (
    <div>
      <p>
        {`${livreRandom.titre} 👨‍🚀 ${livreRandom.auteurPrenom} ${
          livreRandom.auteurNom
        }`}
      </p>
      <p>
        {livreRandom.editeur + " " + livreRandom.isbn + " "}
        <span>📕</span>
      </p>
    </div>
  );
}

class RechercheLivre extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  state = {
    afficherLivres: false,
    afficherRandom: false,
    livresFiltres: [],
    afficherFiltrage: false,
    isLoaded: true
  };

  filtrerLivres = async event => {
    event.preventDefault();
    const typeRecherche = event.target.typeRecherche.value;
    const champRecherche = event.target.champRecherche.value;

    this.setState({
      isLoaded : false,
    });

    const reponse = await fetch(
      urlServiceApi + "Livre/filtrerLivres?" + "typeRecherche=" +
        typeRecherche +
        "&champRecherche=" +
        champRecherche,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.Auth.getToken()
        }
      }
    );
    const result = await reponse.json();
    this.setState({
      livresFiltres: result,
      afficherFiltrage: true,
      isLoaded: true
    });
  };

  resetRecherche = () => {
    this.setState({ afficherLivres: false, afficherFiltrage: false, afficherRandom : false });
  };


  randomLivreDisponible = async () => {

    this.setState({
      isLoaded : false,
    });

    const response = await fetch(urlServiceApi + "Livre/randomLivre", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.Auth.getToken()
      }
    });

    const result = await response.json();
    this.setState({
      livreRandom: result,
      afficherRandom: true,
      isLoaded : true
    });
  };

  render() {
    return (
      <div className="vue">
        <h2>Rechercher un ouvrage dans la bibliothèque</h2>
         {!this.state.isLoaded && <div> <img src={searchingLogo} className="Searching-logo" alt="searching-Logo" /></div>}



<div>
        <button onClick={this.randomLivreDisponible}>
          Un Livre disponible au hasard SVP ! 🎲
        </button>
        <button onClick={this.resetRecherche}>Reset 👻</button>

        {this.state.afficherRandom && (
          <RandomLivre livreRandom={this.state.livreRandom} />
        )}
</div>
        <form name="rechercheLivre" onSubmit={this.filtrerLivres}>
         

            <table><tbody>
            
            <tr><td><label>
              <input type="radio" name="typeRecherche" value="Titre" required />
              Par titre
            </label>

            </td></tr>

            <tr><td>
            <label>
              <input type="radio" name="typeRecherche" value="Auteur" />
              Par nom d'auteur
            </label></td></tr>
        
            <tr><td>
            <label>
              <input type="radio" name="typeRecherche" value="Editeur" />
              Par éditeur
            </label></td></tr>
            </tbody></table>

          <br />
          <label htmlFor="champRecherche">Saisir un mot clef</label>
          <input
            type="text"
            id="champRecherche"
            name="champRecherche"
            required
          />
          <br />
          <button>Rechercher</button>
        </form>

 


        {this.state.afficherFiltrage && (
          <div>
            <p>
              Il y a {this.state.livresFiltres.length} livres correspondant à votre recherche
            </p>
            <ol>
              {this.state.livresFiltres.map(livre => (
                <li key={livre.id} align="start">
                  <div>
                    <p>
                      {livre.titre +
                        " / " +
                        livre.auteurPrenom +
                        " " +
                        livre.auteurNom}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default RechercheLivre;
