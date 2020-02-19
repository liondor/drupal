import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import Bouton from "../Bouton";
import {connectToGLPI} from '../../Util/apiHandling';
import CircularProgress from "@material-ui/core/CircularProgress";

function GLPIConnect(props) {
  var [loading, setLoading] = useState(false);
  var [response, setResponse] = useState(null);

  if (response) {
    if (typeof response.session_token !== "undefined") {
      props.setToken(response.session_token)
      setResponse(null)
    } else if (typeof response.login_error !== "undefined") {
      console.log(response.login_error);
      setResponse(null)
    } else {
      console.log("Communication error between Drupal and React")
      setResponse(null)
    }
    setLoading(false);
  }
  if (!loading) {
    return (
      <div className={'glpiLogin'}>
        <Paper>
          {response ? console.log(response) : ""}
          <p>Pour déposer un ticket, veuillez vous connecter</p>
          <form id={"glpiForm"} onSubmit={handleSubmit}>
            <label htmlFor={"username"}>Nom d'utilisateur </label>
            <input type={"text"} name={"username"}/>
            <label htmlFor={"mail"}>Mot de passe </label>
            <input type={"password"} name={"mdp"}/>
            <Bouton type={'main'} contenu={'Connexion'}/>
          </form>
        </Paper>
      </div>)
  } else {
    return (<CircularProgress/>)
  }


  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    var name = e.target.username.value;
    var pass = e.target.mdp.value;
    connectToGLPI(name, pass, setResponse)

  }
}

export default GLPIConnect
