import React, { Component } from "react";

class AfficherLivres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      livres: [],
    };
  }

  componentDidMount() {
    // I will use fake api from jsonplaceholder website
    // this return 100 posts
    this.fetchListLivres();
  }

  async fetchListLivres() {
    try {
      const response = await fetch("http://localhost:8080/listeLivres");
      const result = await response.json();
      this.setState({
        isLoaded: true,
        livres: result,
        

      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  render() {
    const { error, isLoaded, livres } = this.state;
    if (error) {
      return <div>Error in loading</div>;
    } else if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          <p>Il y a {livres.length} livres dans la bibiothèque </p>
          <ol>
            {livres.map(livre => (
              <li key={livre.id} align="start">
                <div>
                  <p>{livre.titre}</p>
                  <p>{livre.auteurNom}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    }
  }
}

export default AfficherLivres;
