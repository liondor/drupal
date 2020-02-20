import React, {useState} from 'react'
import Dialogue from "../Dialogue";
import {Paper} from "@material-ui/core";
import PresentationPersonnel from "../PresentationPersonnel";
import {getItem} from "../../Util/apiHandling";

/**TODO: Les modifications du composant Dialogue pour le faire marcher avec le composant Projet causes des erreurs dans le composant Annuaire. Il fau adapter Annuaire aux changements effectués dans Dialogue.
 *
 *
 *
 * */

function Annuaire(props) {
  const handleClose = () => {
    setOpen(false);
    setHasCalledForPersonnel(false)
    setSelection("")
    setSelectionName("")
    setListeDuPersonnel("")
  };
  var [selection, setSelection] = useState("");
  var [selectionName, setSelectionName] = useState("");
  var [optionsData, setOptionsData] = useState("");
  var [listeDuPersonnel, setListeDuPersonnel] = useState("");
  var [open, setOpen] = useState(false);
  var [hasCalled, setHasCalled] = useState(false);
  var [hasCalledForPersonnel, setHasCalledForPersonnel] = useState(false);

  getPoles();
  if (listeDuPersonnel)
    console.log(listeDuPersonnel)
  return (
    <div>
      <div id={"annuaire"}>
        <Paper id={"annuaireBackground"}>
          <h2> Contactez-nous !</h2>
          <div id={"annuaireSelectorWrapper"}>
            <select id={"annuaireSelect"} onChange={e => changePole(e)} value={selection}>
              <option value={""}>Choissisez un pôle à contacter....</option>
              {optionsData ? appendOption() : ""}

            </select>
          </div>
        </Paper>
      </div>
      <Dialogue open={open} handleClose={handleClose} titre={selectionName} contenu={appendPersonnel()}/>
    </div>
  );

  function getPoles() {
    if (!hasCalled) {
      getItem("poles_dsin", "", setOptionsData, preventSeveralAPICalls, "taxonomy_term");
    }
  }

  function getPersonnel(idOfPole) {
    if (!hasCalledForPersonnel)
      getItem("personnel", "", setListeDuPersonnel, preventSeveralAPICallsPersonnel, "node", "filter[field_pole.id]=" + idOfPole)
  }

  function preventSeveralAPICalls() {
    setHasCalled(true);
  }

  function preventSeveralAPICallsPersonnel() {
    setHasCalledForPersonnel(true);
  }

  function changePole(event) {
    let poleName = event.target.options[event.target.selectedIndex].text;
    let value = event.target.value;

    if (value === null) {
      console.log("Welp")
    } else {
      console.log("On a effectivement changer le pole :" + value);
      setSelection(value);
      setSelectionName(poleName);
      getPersonnel(value);
      setOpen(true)
    }
  }

  function appendOption() {
    console.log('On charge les catégories !');
    return Object.entries(optionsData).map(([cle, objet]) => (
      <option key={cle} value={objet.id} name={objet.attributes.name}> {objet.attributes.name}</option>))
  }

  function appendPersonnel() {
    console.log('On charge les catégories !');
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
