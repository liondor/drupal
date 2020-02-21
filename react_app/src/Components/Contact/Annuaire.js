import React, {useState} from 'react'
import Dialogue from "../Dialogue";
import {Paper} from "@material-ui/core";
import PresentationPersonnel from "../PresentationPersonnel";
import {getItem} from "../../Util/apiHandling";

/** But : Afficher la liste des employés affecté au pole sélectionné
 * Entrées :  Aucune
 *
 * */

function Annuaire() {
  const handleClose = () => {
    setOuvert(false);
    setAppelAPIPourPersonnelLance(false)
    setOptionChoisie("")
    setNomDuPoleChoisi("")
    setListeDuPersonnel("")
  };
  var [optionChoisie, setOptionChoisie] = useState("");
  var [nomDuPoleChoisi, setNomDuPoleChoisi] = useState("");
  var [donneeDuPoleChoisie, setDonneeDuPoleChoisi] = useState("");
  var [listeDuPersonnel, setListeDuPersonnel] = useState("");
  var [ouvert, setOuvert] = useState(false);
  var [isAppelAPILance, setAppelAPILance] = useState(false);
  var [isAppelAPIPourPersonnelLance, setAppelAPIPourPersonnelLance] = useState(false);

  getPoles();
  return (
    <div>
      <div id={"annuaire"}>
        <Paper id={"annuaireBackground"}>
          <div id={"annuaireSelectorWrapper"}>
            <select id={"annuaireSelect"} onChange={e => changePoleChoisi(e)} value={optionChoisie}>
              <option value={""}>Choissisez un pôle à contacter....</option>
              {donneeDuPoleChoisie ? genereDesOptions() : ""}

            </select>
          </div>
        </Paper>
      </div>
      <Dialogue open={ouvert} handleClose={handleClose} titre={nomDuPoleChoisi} contenu={genereDuPersonnel()}/>
    </div>
  );

  function getPoles() {
    if (!isAppelAPILance) {
      getItem("poles_dsin", "", setDonneeDuPoleChoisi, preventSeveralAPICalls, "taxonomy_term");
    }
  }

  function getPersonnel(idOfPole) {
    if (!isAppelAPIPourPersonnelLance)
      getItem("personnel", "", setListeDuPersonnel, preventSeveralAPICallsPersonnel, "node", "filter[field_pole.id]=" + idOfPole)
  }

  function preventSeveralAPICalls() {
    setAppelAPILance(true);
  }

  function preventSeveralAPICallsPersonnel() {
    setAppelAPIPourPersonnelLance(true);
  }

  function changePoleChoisi(event) {
    let nomDeLOptionChoisi = event.target.options[event.target.selectedIndex].text;
    let valeurDeLOptionChoisie = event.target.value;

    if (valeurDeLOptionChoisie) {
      setOptionChoisie(valeurDeLOptionChoisie);
      setNomDuPoleChoisi(nomDeLOptionChoisi);
      getPersonnel(valeurDeLOptionChoisie);
      setOuvert(true)
    }
  }

  function genereDesOptions() {
    return Object.entries(donneeDuPoleChoisie).map(([cle, objet]) => (
      <option key={cle} value={objet.id} name={objet.attributes.name}> {objet.attributes.name}</option>))
  }

  function genereDuPersonnel() {
    return Object.entries(listeDuPersonnel
    ).map(([cle, objet]) =>
      (
        <PresentationPersonnel key={objet.id} value={objet.id} nom={objet.attributes.title}
                               position={objet.attributes.field_position} prenom={objet.attributes.field_prenom[0]}
                               email={objet.attributes.field_email} telephone={objet.attributes.field_telephone}/>
      )
    )
  }
}

export default Annuaire
