import React, {useRef, useState} from 'react'
import Bouton from "../Bouton";
import GLPIConnect from "./GLPIConnect";
import {createTicket} from "../../Util/apiHandling";
import {Paper} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

/** But : Formulaire permettant de déposer un ticket sur le GLPI
 * Entrée :   - token : Token de session récupéré par le composant GLPIConnect (Par le biais de la fonction setToken)
 *
 *
 *
 * */
function Formulaire() {
  var [isLoading, setLoading] = useState(false);
  var [statutDeLEnvoi, setStatutDeLEnvoi] = useState(null);
  var [categoriesDeTicket, setCategoriesDeTicket] = useState();
  var [token, setToken] = useState("");
  var appelAPIEffectue = useRef(false);

  if (statutDeLEnvoi && isLoading) {
    setLoading(false)
  } else if (token && !isLoading) {
    getCategories();
    return (
      <div style={{width: "100%"}}>
        <Paper>
          <h3>Description de la demande ou de l'incident</h3>
          {typeof statutDeLEnvoi === 'string' ?
            <p style={{color: 'red'}}>{statutDeLEnvoi.split(",")[1].replace(/"/g, "").replace(/]/g, "")}</p> : ""}
          <form id={"formulaire"} encType={"multipart/form-data"} onSubmit={envoiFormulaire}>
            <label htmlFor={"type"}>Type</label>
            <select name={"type"}>
              <option value={"Incident"}>Incident</option>
              <option value={"Demande"}>Demande</option>
            </select>
            <label htmlFor={"category"}>Catégorie</label>
            <select name={"categorie"}>
              {
                typeof categoriesDeTicket !== "undefined" ? (genereOptions()) : ""
              }
            </select>

            <label htmlFor={"titre"}>Titre </label>
            <input type={"text"} name={"titre"} placeholder={"Titre"}/>
            <label htmlFor={"mail"}>Courriel </label>
            <input type={"mail"} name={"mail"} placeholder={"Courriel..."}/>
            <label htmlFor={"description"}> Description du problème
            </label>
            <textarea id={"description"} name={"content"}
                      placeholder={"Décrivez votre problème...."}/>
            <Bouton id={"formButton"} contenu={"Valider"} type={"main"}> </Bouton>
          </form>
        </Paper>
      </div>
    )
  } else if (isLoading) {
    return (
      <CircularProgress/>);
  } else {
    return (
      <GLPIConnect setToken={setToken} setLoading={setLoading}/>
    )
  }

  function getCategories() {
    if (!appelAPIEffectue.current) {
      appelAPIEffectue.current = true;
      fetch('http://localhost:8900/api/glpi/?categorie=1&sessionToken=' + token).then(res => res.clone().json()
      ).then(res => {
        setCategoriesDeTicket(res)
      })
    }
  }

  function envoiFormulaire(e) {
    e.preventDefault();
    let form = e.target;
    let formObject = {
      type: form.type.value,
      titre: form.titre.value,
      mail: form.mail.value,
      categorie: form.categorie.value,
      content: form.content.value
    };
    createTicket(formObject, token, setStatutDeLEnvoi)
    setLoading(true);
    setStatutDeLEnvoi("");
  }

  function genereOptions() {
    return Object.entries(categoriesDeTicket).map(([cle, objet]) => (
      <option key={cle} value={cle}> {objet.name}</option>))
  }


}

export default Formulaire
