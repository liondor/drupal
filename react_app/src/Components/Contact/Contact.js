import React from 'react'
import Annuaire from "./Annuaire";
import Bouton from "../Bouton";
import Map from "./Map";
import Formulaire from "./Formulaire";

const Contact = () => {

    function checkCookies(e) {

        window.location.href = "https://auth.martinique.univ-ag.fr/cas/login?service=http://172.15.255.255/login"


    }

  return (
        <div>
          <div id={"contact"} className={"grid"}>
            <Formulaire/>
                <Annuaire/>
            </div>
            <Map/>
            <Bouton contenu={"Test Auth"} type={"main"} onClick={checkCookies}></Bouton>
        </div>
    );

}

export default Contact
