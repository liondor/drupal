import React from 'react'
import {FaArrowRight} from 'react-icons/fa'

/**Bouton
 * */
const Bouton = (props) => {
  let classeBouton = "";
  let clique = null;
  if (props.arrow) {
    classeBouton += " effect effect-1 "
  }
  if (props.type === "main") {
    classeBouton += " boutonActionPrincipal "
  } else if (!props.type.localeCompare("secondary")) {
    classeBouton += " boutonActionSecondaire "
  }
  if (props.onClick) {
    clique = props.onClick
  }
  let theme = {
    marginTop: props.marge,
    marginBottom: props.marge
  };

  //Nécessaire sinon le bouton de la barre de recherche du petit entête s'affiche sans couleurs
  if (props.modal) {
    theme.backgroundColor = "#0B1D51"
  }

  return (
    <button style={theme} className={classeBouton + "inBetween bouton"} id={props.id} onClick={clique}>
      {props.contenu}
      <div className={"arrowIcon"}><FaArrowRight/></div>
    </button>);


};
export default Bouton
