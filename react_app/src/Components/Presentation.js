import React, {useRef, useState} from 'react'
import useGetParameters from "../Util/urlhandling"
import getItem, {extractData} from "../Util/apiHandling"
import parse from 'html-react-parser'
import CircularProgress from "@material-ui/core/CircularProgress";

/** Ce composant React prendra en entrée un type de contenu et l'id du contenu souhaité.
 * En sortie, ce composant affichera le titre et le corps du contenu désiré
 * Il faut donc :
 * 1) Récupérer le type de contenu et l'id depuis l'URL (Entrée = url ; Sortie = 2 variables contenant chacune un String)
 * 2) Utiliser ces informations pour récupérer /{type}/{id} (Entrée = 2 String; Sortie = Objet Json)
 * 3) Extraire de ces informations le titre et le corps (Entrée = Objet JSON; Sortie = 2 Strings (titre + corps)
 * 3.5) Eventuellement convertir le contenu du corps en HTML
 * 4) Afficher le titre et le corps (Entrée = 2 Strings; Sortie = 1 balise h2 contenant le titre + 1 div qui a pour enfant le String contenant le corps)
 *
 * */
const Presentation = (props) => {
  var searchDone = useRef(false)
  var [titre, setTitre] = useState("")
  var [id, setId] = useState("")
  var [type, setType] = useState("")
  var [contenu, setContenu] = useState("")
  var [image, setImage] = useState("")
  var [results, setResults] = useState(null)

  var div = document.createElement('div')
  if (contenu !== "") {
    div = parse(contenu)
    console.log(contenu)
    console.log(div)

  }
  return (
    <div className={"outilPresentation"}>
      <h1 className={"outilPresentationTitre"}> {props.titre}</h1>
      <Test/>
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


  function Test() {
    var testID = useGetParameters('type', 'id')["id"]
    var testType = useGetParameters('type', 'id')["type"]
    if (!searchDone.current) {
      searchDone.current = true
      getItem(testType, testID, setResults, preventSeveralCalls)
    }
    if (results !== null) {
      console.log(results)
      var data = extractData(results, setImage, 'id', 'type', 'contenu', 'image')
      if (typeof data !== "undefined") {
        setId(data['id'])
        setType(data['type'])
        setContenu(data['contenu'])
      }


      console.log(image)
    }
    return (
      <>
        {

        }
      </>
    );
  }

}

export default Presentation;
