import React from "react";
import './App.css';


class Dashboard extends React.Component{
constructor(props){
    super(props)
}

render(){
    return(

        <div className="vue">
        <h2> Bienvenu NomMembre !</h2>

        <p>Voici la liste des emprunts en cours </p>
        
                
        <p>Vous n'avez aucun emprunt en cours</p>


        <p>Consulter les ouvrages de la bibliothèque d'Issy 1</p>

</div>

    );
}

}

export default Dashboard;