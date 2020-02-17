import React, {useEffect, useState} from 'react'
import Outil from "./Outils";
import CircularProgress from "@material-ui/core/CircularProgress";
import Carte from "./Cartes/Carte";
import useGetParameters from "../Util/urlhandling";

function Liste(props) {
  var [categories, setCatergories] = useState(null)
  var [formattedCategories, setFormattedCategories] = useState(null)
  var pager = 'page[limit]=' + props.limit;
  var content_type = ''
  const content = "node";
  const taxonomyTerm = "taxonomy_term";
  var contentOrTag = "";
  const URL_API = "http://localhost:8900/api/jsonapi/";


  //||Paramaétrage du filtre
  const searchParam = useGetParameters('id', 'type')
  console.log(searchParam.id)
  var filter = "";
  if (!props.type.localeCompare("outils")) {
    filter = "filter[field_categorie.id]=" + searchParam.id
  } else {
    filter = ""
  }

  useEffect(() => {
    // ||Pagination
    if (props.limit !== null && props.limit !== undefined) {
      pager = '&page[limit]=' + props.limit;
    } else {
      pager = ""
    }
    // ||Définition du type de contenu désiré

    if (props.type !== null && props.type !== undefined) {
      if (props.type === "categorie_outils") {
        content_type = "categorie";
        contentOrTag = taxonomyTerm;
      } else {
        contentOrTag = content;

        if (props.type === "articles") {
          content_type = "article"
        }
        if (props.type === "conseils") {
          content_type = "conseils"
        }
        if (props.type === "outils")
          content_type = "outils"
      }
    }
    // || Paramètre limitant le nombre de champs renvoyer par l'API (Améliore les performance, réduit besoin de traiter les données)
    var field = "";
    if (!content_type.localeCompare("categorie")) //localeCompare renvoi 0 lorsque les chaines de caractères comparés sont les mêmes
    {
      field = '&fields[' + contentOrTag + '--' + content_type + ']=name,description,description.value,field_image'
    } else if (!content_type.localeCompare("outils")) {
      field = '&fields[' + contentOrTag + '--' + content_type + ']=title,field_description,field_description.value'
    } else {
      field = '&fields[' + contentOrTag + '--' + content_type + ']=title,field_description,field_description.value,field_image'
    }
    //||Paramaétrage des champs des relations à inclure (voir doc de JSON:API)

    var include = "";
    if (!content_type.localeCompare("outils")) {
      include = ""
    } else {
      include = "include=field_image"
    }

    var sort = ""
    if (typeof props.sort !== 'undefined') {
      if (!props.sort.localeCompare('top')) {
        console.log('Comparaison marche !')
        sort = '&sort=-field_viewcount'
      }
    }
    const urlOfRequest = URL_API + contentOrTag + "/" + content_type + '?' + include + filter + field + pager + sort;
    console.log(urlOfRequest);
    fetch(urlOfRequest, {
      method: 'GET',
      headers: {
        'Autohrization': 'Beaver' + props.token.access_token,
        'Accept': 'application/vnd.api+json',
      },
    }).then((response) => response.json()
    ).then((data) => {
        setCatergories(data)
      },
    ).catch(function (error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    })

  }, [props.token.access_token, props.limit]);

  useEffect(() => {

    let result = categories;
    if (result !== null && result !== undefined) {
      let test = pairData();
      setFormattedCategories(test)
    }
  }, [categories]);

  function pairData() {
    let content = categories.data;
    let images = categories.included;
    if (images) {
      images = images.map(image => {
        let imageURL = image.attributes.uri.url;
        let imageID = image.id;
        return {id: imageID, url: imageURL}
      })
    }
    //   console.log(images);
    let pairedArray = content.map(categorie => {
      let id
      let type
      let imageID
      let titre
      let content
      let result
      let imageURL
      console.log(categorie)
      if (typeof categorie.relationships !== "undefined") {
        if (categorie.relationships.field_image.data !== null) {
        imageID = categorie.relationships.field_image.data.id
        images.forEach(image => {
          if (image.id === imageID)
            imageURL = image.url
        })
        }
      } else {
        imageURL = "/api/sites/default/files/default_images/question-mark.png"
      }
      id = categorie.id
      if (!categorie.type.localeCompare("taxonomy_term--categorie")) {
        titre = categorie.attributes.name
        type = "categorie"
      } else {

        titre = categorie.attributes.title
        type = categorie.type.substring(6)

      }

      if (categorie.attributes.field_description) {
        content = categorie.attributes.field_description.value
      } else if (categorie.attributes.description) {
        console.log("Pour " + titre + ' contenu= ' + categorie.attributes.description.value)
        content = categorie.attributes.description.value
      }
      result = {id: id, titre: titre, description: content, urlImage: imageURL, type: type}
      return result;
    })
    return pairedArray
  }

  function renderChild() {
    let result = formattedCategories
    if (result !== null & content_type !== undefined) {
      return result.map(item => {
        let propriete = {
          key: item.id,
          id: item.id,
          titre: item.titre,
          description: item.description,
          urlImage: item.urlImage,
          type: item.type
        }
        if (props.type === 'categorie_outils' || props.type === 'outils') {
          return (<Outil {...propriete}>Test</Outil>)
        }
        if (props.type === 'conseils' || props.type === 'articles') {
          return (<Carte {...propriete} >Test</Carte>)
        } else {
          return (<p>Error when fetching content</p>)
        }
      })

    } else {
      return <CircularProgress/>

    }
  }

  return (
    <div id={"listeOutils"} className={"conteneur grid"}>
      {renderChild()}

    </div>
  );
}

export default Liste
