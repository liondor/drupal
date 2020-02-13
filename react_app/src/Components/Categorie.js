import React, {useRef, useState} from 'react'
import useGetParameters from "../Util/urlhandling"
import {extractData, getItem} from "../Util/apiHandling"
import parse from 'html-react-parser'
import CircularProgress from "@material-ui/core/CircularProgress";

/** Entrée : ID de la catégorie; Sortie : Liste de composant outils
 * 1)Fetch vers les contenus de types outils en utilisant le filtre field_categorie.id = l'id qu'on reçoit en props
 * (Entrée : props.id ; sortie : Liste d'objet JSON représentant les données des outils de la catégorie/thématique choisie)
 * 2)Pour chacun des ces objets :
 *
 * */
const Categorie = (props) => {
  var searchDone = useRef(false)
  var searchIMGDone = useRef(false)
  /* Les deux variables ci-dessus permettent d'éviter d'effectuer des appels vers l'API à chaque rendu de page.*/

  var [titre, setTitre] = useState("")
  var [id, setId] = useState("")
  var [type, setType] = useState("")
  var [contenu, setContenu] = useState("")
  var [image, setImage] = useState("")
  var [results, setResults] = useState(null)

  var div = document.createElement('div')
  if (contenu !== "") {
    div = parse(contenu)
    // console.log(contenu)
    //console.log(div)

  }
  return (
    <div className={"outilPresentation"}>
      <h1 className={"outilPresentationTitre"}> {titre}</h1>

      <Test/>
      {image ? <img src={image}/> : <CircularProgress/>}
      {contenu !== "" ? parse(contenu) : (
        <div style={{display: "grid", justifyItems: "center"}}><CircularProgress/></div>)}

    </div>);

  function searchContent(type, id) {
    if (!searchDone.current) {
      let url = "http://localhost:8900/api/jsonapi/node/" + type + "/" + id;
      fetch(url,
        {headers: {'Accept': 'application/vnd.api+json'},}
      ).then()
    }

  }

  function preventSeveralCalls() {
    searchDone.current = true;
  }

  function preventSeveralCallsIMG() {
    searchIMGDone.current = true;
  }


  function Test() {
    var testID = useGetParameters('type', 'id')["id"]
    var testType = useGetParameters('type', 'id')["type"]
    if (!searchDone.current) {
      searchDone.current = true
      getItem(testType, testID, setResults, preventSeveralCalls)
    }
    if (results !== null && !searchIMGDone.current) {
      //  console.log(results)
      var data = extractData(results, preventSeveralCallsIMG, setImage, 'id', 'titre', 'type', 'contenu', 'image')
      if (typeof data !== "undefined") {
        setId(data['id'])
        setTitre(data['titre'])
        setType(data['type'])
        setContenu(data['contenu'])
      }
      //    console.log(image)
    }
    return (
      <>
        <h1 className={"outilPresentationTitre"}></h1>

        {

        }
      </>
    );
  }

}

export default Categorie;
