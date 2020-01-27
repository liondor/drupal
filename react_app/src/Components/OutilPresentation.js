import React from 'react'
import {Link} from "react-router-dom";

const OutilPresentation = () => {
    return (
        <div className={"outilPresentation"}>
            <h1 className={"outilPresentationTitre"}> Compte utilisateur</h1>
            <p> Votre compte informatique et les services informatiques standard sont configurés pour
                vous lorsque votre identifiant de connexion est créé. <br/>
                Il existe différents processus pour obtenir cet identifiant.
                <br/>
                Il vous permet de :
                <ul>
                    <li>
                        Avoir accès aux ordinateurs
                    </li>
                    <li>
                        Avoir accès à une boite mail
                    </li>

                </ul>
                Besoin de signaler un problème ? <Link to={"/contact"}>Contactez-nous</Link>
            </p>


        </div>);


}

export default OutilPresentation;