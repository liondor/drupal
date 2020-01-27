import React from 'react'
import Annuaire from "./Annuaire";
import Bouton from "./Bouton";
import Breadcrumbs from "../FilArianne";
import Map from "./Map";

const Contact = () => {
    function handleSubmit(e) {
        e.preventDefault();
    }

    function checkCookies(e) {

        window.location.href = "https://auth.martinique.univ-ag.fr/cas/login?service=http://172.15.255.255/login"
        // window.location.href="http://localhost:3000/Login"


    }

    return (
        <div>
            <Breadcrumbs/>
            <div id={"contact"}>
                <form id={"formulaire"} onSubmit={handleSubmit}>
                    <label htmlFor={"nom"}>Nom </label>
                    <input type={"text"} name={"nom"} placeholder={"Nom"}/>
                    <label htmlFor={"prenom"}>Prénom </label>
                    <input type={"text"} name={"prenom"} placeholder={"Prénom"}/>
                    <label htmlFor={"mail"}>Email </label>
                    <input type={"mail"} name={"mail"} placeholder={"Email"}/>
                    <label htmlFor={"sujet"}>Sujet </label>
                    <input type={"text"} name={"sujet"} placeholder={"Sujet"}/>
                    <label htmlFor={"description"}> Quel est le problème ?
                    </label>
                    <textarea id={"description"} name={"description"}
                              placeholder={"Décrivez votre problème...."}/>
                    <Bouton id={"formButton"} contenu={"Valider"} type={"main"}> </Bouton>
                </form>
                <Annuaire/>
            </div>
            <Map/>
            <Bouton contenu={"Test Auth"} type={"main"} onClick={checkCookies}></Bouton>
        </div>
    );
}

export default Contact