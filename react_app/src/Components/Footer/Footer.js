import React from 'react'
import logo from '../Logo.png'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className={"grid4"}>

                <div id={"footerLogoContact"}>
                    <img className={"footerLogo"} src={logo}/>
                    <Link to={"contact"}> Contactez-nous </Link>
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
                            <a className={"lessImportantText"}> Lien exemple</a>
                        </li>
                        <li>
                            <a className={"lessImportantText"}> Lien exemple</a>
                        </li>
                        <li>
                            <a className={"lessImportantText"}> Lien exemple</a>
                        </li>

                    </ul>
                </div>
                <div>
                    <h4 className={"goldenText"}> Nos partenaires </h4>
                    <ul className={"lessImportantText"}>
                        <li>
                            <a> Lien exemple</a>
                        </li>
                        <li>
                            <a className={"lessImportantText"}> Lien exemple</a>
                        </li>
                        <li>
                            <a className={"lessImportantText"}> Lien exemple</a>
                        </li>

                    </ul>
                </div>
            </footer>
        </>);

}
export default Footer