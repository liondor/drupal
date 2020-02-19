import React, {useState} from 'react'
import Dialogue from "../Dialogue";
import {Paper} from "@material-ui/core";
import PresentationPersonnel from "../PresentationPersonnel";

/**TODO: Les modifications du composant Dialogue pour le faire marcher avec le composant Projet causes des erreurs dans le composant Annuaire. Il fau adapter Annuaire aux changements effectués dans Dialogue.
 *
 *
 *
 * */

function Annuaire(props) {
  const handleClose = () => {
    setOpen(false);
  };
  var [selection, setSelection] = useState("");
  var [open, setOpen] = useState(false);

  return (
    <>
      <div id={"annuaire"}>
        <Paper id={"annuaireBackground"}>
          <h2> Contactez-nous !</h2>
          <div id={"annuaireSelectorWrapper"}>
            <select id={"annuaireSelect"} onChange={e => changePole(e.target.value)} value={selection}>
              <option value={""}>Choissisez un pôle à contacter....</option>
              <option value={"Pôle Infrastructure Centrale"}>Pôle Infrastructure Centrale</option>
              <option value={"Pôle Infrastructure de Proximité"}>Pôle Infrastructure de Proximité</option>
              <option value={"Pôle Application Métier"}>Pôle Application Métier</option>
            </select>
          </div>
        </Paper>
      </div>
      <Dialogue open={open} handleClose={handleClose} titre={selection} contenu={<PresentationPersonnel/>}/>
    </>
  );

  function changePole(value) {
    console.log("On rentre ici ?");

    if (value == null) {
      console.log("Welp")
    } else {
      console.log("On a effectivement changer le pole :" + value);
      setSelection(value);
      setOpen(true)
    }
  }
}

export default Annuaire
