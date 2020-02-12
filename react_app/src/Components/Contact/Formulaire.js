import React, {useRef, useState} from 'react'
import Bouton from "../Bouton";
import GLPIConnect from "./GLPIConnect";
import {createTicket} from "../../Util/apiHandling";

function Formulaire() {
  var [type, setType] = useState("");
  var [loading, setLoading] = useState(false);
  var [response, setResponse] = useState(null);
  var [categorie, setCategorie] = useState();
  var [urgence, setUrgence] = useState("");
  var [Titre, setTitre] = useState("");
  var [Lieu, setLieu] = useState("");
  var [Description, setDescription] = useState("");
  var [token, setToken] = useState("");
  var categoriesRequested = useRef(false);

  if (token) {
    getCategories();
    return (
      <div>
        <form id={"formulaire"} encType={"multipart/form-data"} onSubmit={handleSubmit}>
          <label htmlFor={"type"}>Type</label>
          <select name={"type"}>
            <option value={"Incident"}>Incident</option>
            <option value={"Demande"}>Demande</option>
          </select>
          <label htmlFor={"category"}>Catégorie</label>
          <select name={"categorie"}>
            {
              typeof categorie !== "undefined" ? (appendOption()) : ""
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
      </div>
    )
  } else {
    return (
      <GLPIConnect setToken={setToken} setLoading={setLoading}/>

    )
  }

  function getCategories() {
    if (!categoriesRequested.current) {
      categoriesRequested.current = true;
      fetch('http://localhost:8900/api/glpi/?categorie=1&sessionToken=' + token).then(res => res.clone().json()
      ).then(res => {
        console.log(res);
        setCategorie(res)
      })
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let formObject = {
      type: form.type.value,
      titre: form.titre.value,
      mail: form.mail.value,
      categorie: form.categorie.value,
      content: form.content.value
    }
    createTicket(formObject, token, setResponse)
  }

  function appendOption() {
    console.log('On charge les catégories !')
    return Object.entries(categorie).map(([cle, objet]) => (<option key={cle} value={cle}> {objet.name}</option>))
  }


}

export default Formulaire
