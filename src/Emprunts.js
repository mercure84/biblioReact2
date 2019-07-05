import React, { Component } from 'react';
import AuthService from "./JWTAuthentication/AuthService.js";

const Auth = new AuthService();

class Emprunts extends Component {


    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.afficherEmprunts();
        }

state = {
isLoaded : true,
listeEmprunts : []

};


afficherEmprunts = async () =>{

this.setState({
    isLoaded : false
});

const reponse = await fetch("http://localhost:8080/EmpruntsMembre/" + localStorage.getItem("userId"),
{method : "GET",
headers :{
    Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.Auth.getToken()

}})

const resultat = await reponse.json();
this.setState({
    listeEmprunts : resultat
})

}


    render(){
        return(

<div className="vue">

{(this.state.listeEmprunts.length!=0) && <div id="listeEmprunts">
<h2> Vos emprunts en cours : </h2>
<table>
<thead><tr><th>Livre</th><th>Date d'emprunt</th><th>Date limite de restitution</th><th>Prolonger</th></tr></thead>
<tbody>
{this.state.listeEmprunts.map(emprunt => (
<tr key={emprunt.id}><td>{emprunt.livre.titre}</td><td>{emprunt.debutDate}</td><td>{emprunt.finDate}</td><td>X</td></tr>))}

</tbody></table>



</div>}
</div>


        )
    }
}
export default Emprunts;