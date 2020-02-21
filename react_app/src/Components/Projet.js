import React, {useRef, useState} from 'react'
import Carte from "./Cartes/Carte";
import Bouton from "./Bouton";
import useGetParameters from "../Util/urlhandling";
import {CircularProgress} from "@material-ui/core";
import {getCookie, getImageURL} from '../Util/apiHandling'
import Dialogue from "./Dialogue";

/**
 *
 * */
function Projet() {
  var [tokenSession, setTokenSession] = useState("");
  var [carteChoisie, setCarteChoisie] = useState("");
  var [thumbnail, setThumbnail] = useState("");
  var [contenuDuProjetChoisi, setContenuDuProjetChoisi] = useState("");
  var [imageURL, setImageURL] = useState("");
  var [titreProjetChoisi, setTitreProjetChoisi] = useState("");
  var [open, setOpen] = useState(false);
  var [data, setData] = useState("");
  var [error, setError] = useState("");
  var [isLoading, setIsLoading] = useState(false);
  var ticketCAS = useRef("");
  var isAppelAPISessionFait = useRef(false);
  var isAppelAPIContenuFait = useRef(false);

  function handleClick() {
    setError('');
    setIsLoading(true);
    setTokenSession('');
    window.location.href = "https://auth.martinique.univ-ag.fr/cas/login?service=http://localhost:8900/projets"
  }

  const handleClose = () => {
    setOpen(false);
    setTitreProjetChoisi("");
    setContenuDuProjetChoisi('');
    setCarteChoisie('');
    setImageURL('');
  };
  let parameters = '';
  parameters = useGetParameters('ticket');
  if (tokenSession) {
    askForPermission(tokenSession);
  } else {
    let sessionCookie = ('');
    sessionCookie = getCookie('id_session');
    if (sessionCookie && !parameters['ticket']) {
      setTokenSession(sessionCookie);
      setIsLoading(true);
    }

  }
  if (typeof parameters.ticket !== "undefined") {
    if (parameters.ticket && !ticketCAS.current) {
      ticketCAS.current = parameters.ticket;
      setIsLoading(true);
      startSession(ticketCAS);
    }
  }
  if (data) {
    if (carteChoisie) {
      getAssociatedContent()
    }
    return (
      <div className={"projets grid conteneur"}>
        {generateProjects()}
        <Dialogue open={open} handleClose={handleClose} titre={titreProjetChoisi} contenu={contenuDuProjetChoisi}
                  img={imageURL}/>
      </div>
    );
  } else if (!data && isLoading && !error) {
    return (
      <CircularProgress/>
    );
  } else {
    return (
      <div>
        {error ? <p style={{color: "red"}}>{error}</p> : <p> Vous n'êtes pas autorisé à visualiser cette page</p>}
        <Bouton type={"main"} contenu={"Obtenir la permission"} onClick={handleClick}/>
      </div>
    );
  }

  function askForPermission(tokenDeSession) {
    if (!isAppelAPIContenuFait.current) {
      isAppelAPIContenuFait.current = true;
      fetch('/api/projets?session=' + tokenDeSession
      ).then(result => {
          return result.json()
        }
      ).then(result => {
        console.log(result);
        if (typeof result.data !== "undefined" && result.data) {
          setData(result.data);
          return result.data
        } else if (typeof result.message !== "undefined" && result.message) {
          setError(result.message);
          setTokenSession('');
          return result.message
        } else {
          setError("Check API Call")
        }
      }).catch(error => console.warn(error))
    }
  }

  function generateProjects(listOfObjects) {
    let properties = {};

    if (data) {
      return data.map(node => {
        getImageURL(node.relationships, setThumbnail);
        properties.key = node.id;
        properties.titre = node.attributes.title;
        properties.type = 'projets';
        properties.id = node.id;
        properties.urlImage = thumbnail;
        properties.setSelectedCard = setCarteChoisie;
        return (<Carte {...properties} />);
      });
    }
  }

  function startSession() {
    if (!isAppelAPISessionFait.current) {
      isAppelAPISessionFait.current = true;
      fetch('/api/sessionhandle?ticket=' + ticketCAS.current
      ).then(result => result.json()
      ).then(resultat => {
          if (typeof resultat.id_session !== "undefined") {
            setTokenSession(resultat.id_session);
            document.cookie = "id_session=" + resultat.id_session;
            return (resultat.id_session)
          } else if (typeof resultat.message !== "undefined") {
            setError(resultat.message);
            return (resultat.message)
          }
        }
      ).catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })
    }

  }

  function getAssociatedContent() {
    if (carteChoisie && !contenuDuProjetChoisi) {
      let seletedProject = data.filter(node => node.id === carteChoisie)[0];
      let projectData = seletedProject.attributes;
      let projectRelationship = seletedProject.relationships;
      console.log(projectData);
      setContenuDuProjetChoisi(projectData.body.value);
      setTitreProjetChoisi(projectData.title);
      setOpen(true);
      getImageURL(projectRelationship, setImageURL)
    }
  }
}

export default Projet
