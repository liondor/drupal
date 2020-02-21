import React, {useState} from 'react'
import {MdSearch} from 'react-icons/md'
import Bouton from "../Bouton";
import {Link} from "react-router-dom";

function BarreDeRecherche(props) {
  var [requete, setRequete] = useState("");
    return (
        <div className={"searchbar_container"}>
          <input id={'searchInput'} type={"text"} placeholder={"Rechercher..."}
                 onChange={updateRequete}/>
            <label className={'headerSearchSubmitWrapper'}>
              <input type={"submit"} className={'headerSearchSubmit'}/>
              <Link to={"/recherche?q=" + requete} onClick={props.reset}> <Bouton type={"main"} contenu={<MdSearch/>}
                                                                                  modal={props.modal}
                                                                                  onClick={props.toggle}/></Link>
            </label>
        </div>
    );

  function updateRequete(event) {
    setRequete(event.target.value)
  }
}

export default BarreDeRecherche;
