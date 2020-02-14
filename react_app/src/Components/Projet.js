import React, {useRef, useState} from 'react'
import Carte from "./Cartes/Carte";
import Bouton from "./Bouton";
import useGetParameters from "../Util/urlhandling";
import {CircularProgress} from "@material-ui/core";

/**TODO:Modifier la structure du composant Session afin qu'il vérifie
 *
 * */
function Projet() {

  var [autorisation, setAutorisation] = useState(false)
  var [session, setSession] = useState("")
  var [data, setData] = useState("")
  var [error, setError] = useState("")
  var [isLoading, setIsLoading] = useState(false)
  var ticket = useRef("")
  var isSessionRequested = useRef(false)
  var isContentRequested = useRef(false)

  function handleClick(e) {

    window.location.href = "https://auth.martinique.univ-ag.fr/cas/login?service=http://localhost:8900/projets"
    //  fetch("http://localhost:8900/api/?session=")

  }

  let parameters = useGetParameters('ticket');
  if (session) {
    askForPermission(session);

  }
  if (typeof parameters.ticket !== "undefined") {
    if (parameters.ticket && !ticket.current) {
      ticket.current = parameters.ticket;
      setIsLoading(true)
      startSession(ticket);
    }
  }

  if (data) {
    return (
      <div className={"projets grid"}>
        <Carte/>
        <Carte/>
        <Carte/>
      </div>

    );
  } else if (!data && isLoading && !error) {
    return (
      <CircularProgress/>
    );
  } else {
    return (
      <div>
        <p>
          Vous n'êtes pas autorisé à visualiser cette page
        </p>
        {error ? <p style={{color: "red"}}>{error}</p> : ""}
        <Bouton type={"main"} contenu={"Obtenir la permission"} onClick={handleClick}/>
      </div>
    );
  }

  function askForPermission(session) {
    if (!isContentRequested.current) {
      isContentRequested.current = true
      fetch('/api/projets?session=' + session
      ).then(result => result.json()
      ).then(result => {
        console.log(result);
        if (typeof result.data !== "undefined" && result.data) {
          setData(result.data);
          return result.data
        } else if (typeof result.message !== "undefined" && result.message) {
          setError(result.message);
          return result.message
        } else {
          setError("Check API Call")
        }
      })
    }

  }

  function startSession() {
    if (!isSessionRequested.current) {
      isSessionRequested.current = true;
      fetch('/api/sessionhandle?ticket=' + ticket.current
      ).then(result => result.json()
      ).then(resultat => {
          console.log(resultat);
          if (typeof resultat.id_session !== "undefined") {
            setSession(resultat.id_session)
            return (resultat.id_session)
          } else if (typeof resultat.message !== "undefined") {
            setError(resultat.message)
            return (resultat.message)
          }
        }
      ).catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })
    }

  }

}

export default Projet
