import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import Bouton from "../Bouton";
import {connectToGLPI} from '../../Util/apiHandling'

function GLPIConnect(props) {
  var [userName, setUserName] = useState("")
  var [password, setPassword] = useState("")
  return (
    <div>
      <Paper>

        <p>Pour déposer un ticket, veuillez vous connecter</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor={"username"}>Nom d'utilisateur </label>
          <input type={"text"} name={"username"}/>
          <label htmlFor={"mail"}>Mot de passe </label>
          <input type={"password"} name={"mdp"}/>
          <Bouton type={'main'} contenu={'Connexion'}/>
        </form>
      </Paper>
    </div>
  )

  function handleSubmit(e) {
    e.preventDefault();
    var name = e.target.username.value
    var pass = e.target.mdp.value
    connectToGLPI(name, pass, props.setToken)
    console.log(e.target.username.value)
  }
}

export default GLPIConnect
