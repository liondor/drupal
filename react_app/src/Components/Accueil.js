import React from 'react'
import Bouton from "./Bouton";
import PhotoText from "./PhotoText";
import Liste from "./Liste";
import {Link} from "react-router-dom";

const Accueil = (props) => {
    return (
        <div id={"accueil"}>
            <h2 className={"titreSection"}> Conseils</h2>
            <div className="conteneur fillScreen grid">
              <Liste token={props.token} limit={3} type={'conseils'} sort={'top'}/>
            </div>
            <h2 className={"titreSection"}> Actualités</h2>
            <div className="conteneur fillScreen grid">
              <Liste token={props.token} limit={3} type={'articles'}/>

            </div>
          <Link to={"news"}>
            <Bouton marge={"30px"} contenu={"Plus d'actus"} type={"secondary"} arrow={true}/>
          </Link>
            <div className={"accueilOutilsWrapper whiteText"}>
                <div className={"greyBackground"}/>
                <div className={"accueilOutilsSubWrapper"}>
                    <h2 className={"titreSection "}>Outils numériques populaires </h2>
                    <div className={"accueilOutils"}>
                      <Liste token={props.token} limit={3} type={'categorie_outils'}/>
                    </div>
                  <Link to={"outils"}>
                    <Bouton marge={"30px"} contenu={"Plus d'outils"} type={"secondary"} arrow={true}/>
                  </Link>
                </div>
            </div>
            <PhotoText/>
        </div>
    );
};
export default Accueil;
