import React, {useRef, useState} from 'react'
import useGetParameters from "../Util/urlhandling"
import {extractData, getItem} from "../Util/apiHandling"
import parse from 'html-react-parser'
import CircularProgress from "@material-ui/core/CircularProgress";
import Bouton from "./Bouton";
import {Link} from "react-router-dom";

/** Ce composant React prendra en entrée un type de contenu et l'id du contenu souhaité.
 * En sortie, ce composant affichera le titre et le corps du contenu désiré
 * Il faut donc :
 * 1) Récupérer le type de contenu et l'id depuis l'URL (Entrée = url ; Sortie = 2 variables contenant chacune un String)
 * 2) Utiliser ces informations pour récupérer /{type}/{id} (Entrée = 2 String; Sortie = Objet Json)
 * 3) Extraire de ces informations le titre et le corps (Entrée = Objet JSON; Sortie = 2 Strings (titre + corps)
 * 3.5) Eventuellement convertir le contenu du corps en HTML
 * 4) Afficher le titre et le corps (Entrée = 2 Strings; Sortie = 1 balise h2 contenant le titre + 1 div qui a pour enfant le String contenant le corps)
 *
 *
 * */
const Presentation = (props) => {
  var searchDone = useRef(false)
  var searchIMGDone = useRef(false)
  /* Les deux variables ci-dessus permettent d'éviter d'effectuer des appels vers l'API à chaque rendu de page.*/

  var [titre, setTitre] = useState("")
  var [id, setId] = useState("")
  var [type, setType] = useState("")
  var [contenu, setContenu] = useState("")
  var [image, setImage] = useState("")
  var [results, setResults] = useState(null)
  var origin = useRef("");

  return (
    <div className={"outilPresentation"}>
      <h1 className={"outilPresentationTitre"}> {titre}</h1>
      {useGetContenu()}
      {contenu !== "" ? (<div>{parse(contenu)}</div>) : (
        <div style={{display: "grid", justifyItems: "center"}}><CircularProgress/></div>)}
      {generateButton()}

    </div>);


  function preventSeveralCalls() {
    searchDone.current = true;
  }

  function preventSeveralCallsIMG() {
    searchIMGDone.current = true;
  }

  function generateButton() {
    let page = "";
    let contenu = ""
    let isArticleOrOutil = false;
    if (type) {
      let typeOfContent = type.substring(6);
      switch (typeOfContent) {
        case("article"):
          page = 'news';
          contenu = "Retour vers la liste des articles"
          isArticleOrOutil = true;
          break;
        case ("outils"):
          page = 'categorie?id=' + origin.current + '&type=categorie';
          contenu = "Retour vers la liste des outils numériques";
          isArticleOrOutil = true;
          break;
      }
      if (isArticleOrOutil) {
        return (<Link to={page}><Bouton type={'main'} contenu={contenu}/> </Link>);
      }
    }
  }

  function useGetContenu() {
    const parameters = useGetParameters('type', 'id', 'origin')
    var testID = parameters["id"]
    var testType = parameters["type"]
    var idDeLaCategorie = parameters["origin"]
    origin.current = idDeLaCategorie;
    if (!searchDone.current) {
      searchDone.current = true
      getItem(testType, testID, setResults, preventSeveralCalls)
    }
    if (results !== null && !searchIMGDone.current) {
      var data = extractData(results, preventSeveralCallsIMG, setImage, 'id', 'titre', 'type', 'contenu', 'image')
      if (typeof data !== "undefined") {
        setId(data['id'])
        setTitre(data['titre'])
        setType(data['type'])
        setContenu(data['contenu'])
      }
    }
  }

}

export default Presentation;
