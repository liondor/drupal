import React, {useState} from 'react';
import './Carte2.css'
import {Link} from "react-router-dom";

/** But : Composant servant à donner un aperçu d'un article, d'un conseil ou d'un projet
 * Entrée : - id : l'identifiant du contenu de la carte
 *          - titre : Le titre du contenu
 *          - type : Le type de ce contenu  (article, conseil, projets)
 *          - setCarteChoisie : Fonction renvoyant au composant parent l'id du contenu
 *          - urlImage : Le chemin devant être parcouru pour récupéré l'image associé au contenu
 * */
export default function Carte(props) {
  var [thumbnail, setThumbnail] = useState('');

  let attributsElementLink = {};
  if (props.type === 'projets') {
    attributsElementLink.to = "/projets"
    attributsElementLink.onClick = renvoiCarteChoisieAProjet;
  } else {
    attributsElementLink.to = '/presentation?id=' + props.id + '&type=' + props.type
  }

  function renvoiCarteChoisieAProjet(e) {
    props.setSelectedCard(props.id);
  }

  if (props.id) {

  }

  return (
    <Link {...attributsElementLink}>
      <div className={"carte"}>
        {
          props.urlImage ? <img alt={"Photo de l'université"} src={"http://localhost:8900" + props.urlImage}
                                className={"thumbnail"}/> :
            <img alt={"Photo de l'université"} className={"thumbnail"} src={
              "/api/sites/default/files/default_images/Logo%20DSIN%20sans%20UA.png"}/>
        }

        <div className={"titre_carte"}>
          {
            props.titre ? <h4 className={'bold'}> {props.titre}</h4> :
              <h4> Découvrez les outils numériques de l'université</h4>
          }
        </div>
      </div>
    </Link>
  );
}
