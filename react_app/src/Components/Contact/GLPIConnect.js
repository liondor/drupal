import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import Bouton from "../Bouton";
import {connectToGLPI} from '../../Util/apiHandling';
import CircularProgress from "@material-ui/core/CircularProgress";

function GLPIConnect(props) {
  var [loading, setLoading] = useState(false);
  var [response, setResponse] = useState(null);
  var [errorMsg, setErrorMsg] = useState("");
  if (response) {

    if (typeof response.session_token !== "undefined") {
      props.setToken(response.session_token)
      setResponse(null)
    } else if (typeof response.login_error !== "undefined") {
      setErrorMsg(response.login_error);
      setResponse(null)
    } else {
      setErrorMsg("Service indisponible");
      setResponse(null)
    }
    setLoading(false);
  }
  if (!loading) {
    return (
      <div className={'glpiLogin'}>
        <Paper>
          <p>Pour déposer un ticket, veuillez vous connecter</p>
          {
            errorMsg ? <p style={{color: 'red'}}>{errorMsg}</p> : ""
          }
          <form id={"glpiForm"} onSubmit={connexion}>
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


  function connexion(e) {
    e.preventDefault();
    setLoading(true);
    var nomUtilisateur = e.target.username.value;
    var motDePasse = e.target.mdp.value;
    setErrorMsg("");
    connectToGLPI(nomUtilisateur, motDePasse, setResponse)

  }
}

export default GLPIConnect
