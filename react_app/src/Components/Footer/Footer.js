import React from 'react'
import {Link} from "react-router-dom";
import Bouton from "../Bouton";

const Footer = () => {
    return (
        <>
            <footer className={"grid4 grid"}>

                <div id={"footerLogoContact"}>
                  <img className={"footerLogo"} src={"api/sites/default/files/default_images/Logo.png"}/>
                  <Link to={"contact"}><Bouton type={"main"} contenu={' Contactez-nous'}/></Link>
                </div>
                <div>
                    <div><h6 className={"goldenText"}> Guadeloupe</h6>
                        <p> 3ème étage bâtiment recherche, Campus de Fouillole, Fouillole, BP 250 97157
                            Pointe-à-Pitre</p>
                    </div>
                    <div><h6 className={"goldenText"}> Martinique</h6>
                        <p> 3ème étage bâtiment recherche, Campus de Fouillole, Fouillole, BP 250 97157
                            Pointe-à-Pitre</p>
                    </div>
                </div>
                <div>
                    <h4 className={"goldenText"}> Nos plateformes </h4>
                    <ul>
                        <li>
                          <a href={"http://ent.univ-antilles.fr/"} className={"lessImportantText"}> ENT</a>
                        </li>
                        <li>
                          <a href={"https://ecursus.univ-antilles.fr/"} className={"lessImportantText"}> eCursus</a>
                        </li>
                        <li>
                          <a href={'https://bu.univ-antilles.fr/'} className={"lessImportantText"}> Bibliothèque</a>
                        </li>

                    </ul>
                </div>

            </footer>
        </>);

}
export default Footer
