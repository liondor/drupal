var BASE_URL = "http://localhost:8900/api/"
const RESSOURCE_URL = BASE_URL + "jsonapi/"


export function getItem(type, id, functionToKeepResults, functionToPreventSeveralAPICall, elementType = "node", additionnalparameters = "") {
  if (type !== undefined && id !== undefined) {
    let url = RESSOURCE_URL + elementType + "/" + type + "/" + id + "?" + additionnalparameters;
    functionToPreventSeveralAPICall()
    fetch(url
    ).then(result => {
        return result.json()
      }
    ).then(result => result.data
    ).then(result => functionToKeepResults(result)
    ).catch(error => console.warn(error))
  } else {
    console.log("Undefined parameters ! Type :" + type + "  Id :" + id);
  }
}


export function extractData(donneesObjetJSON, functionToPreventSeveralCall, functionToKeepTheImageURL, ...donneesSouhaite) {
  let donneesExtraites = {};
  functionToPreventSeveralCall();
  for (let i = 0; i < donneesSouhaite.length; i++) {
    switch (donneesSouhaite[i]) {
      case 'id' :
        insereDonnees(donneesObjetJSON.id, 'id', donneesExtraites)
        break;
      case 'type' :
        insereDonnees(donneesObjetJSON.type, 'type', donneesExtraites)
        break;
      case 'titre' :
        insereDonnees(donneesObjetJSON.attributes.title, 'titre', donneesExtraites)
        break;
      case 'contenu' :
        if (typeof donneesObjetJSON.attributes.field_description !== "undefined" && donneesObjetJSON.attributes.field_description !== null) {
          insereDonnees(donneesObjetJSON.attributes.field_description.value, 'contenu', donneesExtraites)
        } else if (typeof donneesObjetJSON.attributes.body !== "undefined" && donneesObjetJSON.attributes.body !== null) {
          insereDonnees(donneesObjetJSON.attributes.body.value, 'contenu', donneesExtraites)
        }
        break;
      case'image' :
        if (typeof functionToKeepTheImageURL !== "undefined" && typeof donneesObjetJSON.relationships !== "undefined") {
          getImageURL(donneesObjetJSON.relationships, functionToKeepTheImageURL)
        }
        break;
      default :
        console.log("'" + donneesSouhaite[i] + "'" + " Is not something that can be extracted ")
    }
  }
  return donneesExtraites;
}

/** Référence au concept clé:valeur des objets json
 *
 * */
export function insereDonnees(valeurDeLaCle, nomDeLaCle, conteneur) {
  if (typeof valeurDeLaCle !== "undefined") {
    conteneur[nomDeLaCle] = valeurDeLaCle;
  } else {
    console.log(nomDeLaCle + 'not found')
  }

}

export function getImageURL(objetRelation, functionToSaveURL) {
  if (typeof objetRelation !== "undefined") {
    if (typeof objetRelation.field_image !== "undefined") {
      if (objetRelation.field_image.data) {
        if (typeof objetRelation.field_image.data.id !== "undefined") {

          let imageID = objetRelation.field_image.data.id
          return fetch(RESSOURCE_URL + "file/file/" + imageID
          ).then(result => result.json()
          ).then(result => {
              return result.data.attributes.uri.url
            }
          ).then(result => {
              functionToSaveURL(result)
            }
          ).catch(error => console.warn(error))
        } else {
          console.log('The content you asked for does not have an image attached to it')
        }
      }
    }
  } else {
    console.log('The content you asked for does not have an relation')
  }
}

export function connectToGLPI(username, password, setResponse) {

  fetch(BASE_URL + 'glpi?username=' + username + '&password=' + password
  ).then(response => response.json()
  ).then(responseJSON => setResponse(responseJSON)
  ).catch(error => console.warn(error))
}

export function createTicket(formulaireJSON, tokenDeSession, conservationReponseServeur) {
  fetch(BASE_URL + 'glpi?sessionToken=' + tokenDeSession,
    {
      method: 'POST',
      body: JSON.stringify(formulaireJSON)
    }).then(result => {
    return result.clone().json()
    }
  ).then(resultJSON => {
    conservationReponseServeur(resultJSON)
    }
  ).catch(error => console.warn(error.message))

}

export function getCookie(nomDuCookie) {
  var nomCookie = nomDuCookie + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var listeCookies = decodedCookie.split(';');
  for (var i = 0; i < listeCookies.length; i++) {
    var cookie = listeCookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nomCookie) === 0) {
      return cookie.substring(nomCookie.length, cookie.length);
    }
  }
  return "";
}
