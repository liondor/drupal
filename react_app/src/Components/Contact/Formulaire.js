import React, {useState} from 'react'
import Bouton from "../Bouton";
import GLPIConnect from "./GLPIConnect";
import {createTicket} from "../../Util/apiHandling";

function Formulaire() {
  var [type, setType] = useState("")
  var [response, setResponse] = useState(null)
  var [categorie, setCategorie] = useState("")
  var [urgence, setUrgence] = useState("")
  var [Titre, setTitre] = useState("")
  var [Lieu, setLieu] = useState("")
  var [Description, setDescription] = useState("")

  var [token, setToken] = useState("")

  if (true) {
    return (
      <div>
        <form id={"formulaire"} encType={"multipart/form-data"} onSubmit={handleSubmit}>
          <label htmlFor={"type"}>Type</label>
          <select name={"type"}>
            <option value={"Incident"}>Incident</option>
            <option value={"Demande"}>Demande</option>
          </select>

          <label htmlFor={"titre"}>Titre </label>
          <input type={"text"} name={"titre"} placeholder={"Titre"}/>

          <label htmlFor={"mail"}>Courriel </label>
          <input type={"mail"} name={"mail"} placeholder={"Courriel..."}/>
          <label htmlFor={"description"}> Description du problème
          </label>
          <textarea id={"description"} name={"description"}
                    placeholder={"Décrivez votre problème...."}/>
          <Bouton id={"formButton"} contenu={"Valider"} type={"main"}> </Bouton>
        </form>
        {response ? console.log('Success !  result= ' + response.test) : ""}
      </div>
    )
  } else {
    return (
      <GLPIConnect setToken={setToken}/>
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let formObject = {
      type: form.type.value,
      titre: form.titre.value,
      mail: form.mail.value

    }
    createTicket(formObject, setResponse)

  }
}

export default Formulaire
