import React, {useState} from 'react'
import Bouton from "../Bouton";
import GLPIConnect from "./GLPIConnect";

function Formulaire() {
  var [type, setType] = useState("")
  var [categorie, setCategorie] = useState("")
  var [urgence, setUrgence] = useState("")
  var [Titre, setTitre] = useState("")
  var [Lieu, setLieu] = useState("")
  var [Description, setDescription] = useState("")
  var [token, setToken] = useState("")

  if (token) {
    return (
      <div>
        <form id={"formulaire"} onSubmit={handleSubmit}>
          <label htmlFor={"type"}>Type</label>
          <select>
            <option value={"Incident"}>Incident</option>
            <option value={"Demande"}>Demande</option>
          </select>
          <input type={"text"} name={"nom"} placeholder={"Type"}/>
          <label htmlFor={"prenom"}>Prénom </label>
          <input type={"text"} name={"prenom"} placeholder={"Prénom"}/>
          <label htmlFor={"mail"}>Email </label>
          <input type={"mail"} name={"mail"} placeholder={"Email"}/>
          <label htmlFor={"sujet"}>Sujet </label>
          <input type={"text"} name={"sujet"} placeholder={"Sujet"}/>
          <label htmlFor={"description"}> Quel est le problème ?
          </label>
          <textarea id={"description"} name={"description"}
                    placeholder={"Décrivez votre problème...."}/>
          <Bouton id={"formButton"} contenu={"Valider"} type={"main"}> </Bouton>
        </form>

      </div>
    )
  } else {
    return (
      <GLPIConnect setToken={setToken}/>)
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
}

export default Formulaire
