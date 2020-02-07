import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import Bouton from "../Bouton";
import {connectToGLPI} from '../../Util/apiHandling'

function GLPIConnect(props) {
  var [userName, setUserName] = useState("")
  var [password, setPassword] = useState("")
  var [response, setResponse] = useState(null)

  if (response) {
    if (typeof response.session_token !== "undefined") {
      props.setToken(response.session_token)
    } else if (typeof response.login_error !== "undefined") {
      console.log(response.login_error)
    } else {
      console.log("Communication error between Drupal and React")
    }
  }
  return (
    <div>
      <Paper>
        {response ? console.log(response) : ""}
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
    connectToGLPI(name, pass, setResponse)

  }
}

export default GLPIConnect
