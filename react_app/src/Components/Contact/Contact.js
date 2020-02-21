import React from 'react'
import Annuaire from "./Annuaire";
import Map from "./Map";
import Formulaire from "./Formulaire";

/**But : Contient et met en page l'Annuaire, le formulaire et la carte interactive
 * Entrée : Aucune
 *
 * */

const Contact = () => {

  return (
    <div>
      <h2> Contactez-nous !</h2>
      <div id={"contact"} className={"grid"}>
        <Formulaire/>
        <Annuaire/>
      </div>
      <Map/>
    </div>
  );

};

export default Contact
