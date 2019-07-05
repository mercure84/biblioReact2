import React, { Component } from 'react';
import withAuth from "./JWTAuthentication/withAuth.js";
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
listeEmprunt : []

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
    listeEmprunt : resultat
})

}




    render(){
        return(

<h2> Vos emprunts en cours : </h2>




        )
    }
}
export default Emprunts;