import React, {useEffect, useRef, useState} from 'react'
import {MdSearch} from 'react-icons/md'
import Bouton from "../Bouton";
import {Link} from "react-router-dom";

function SearchBar(props) {
  var [open, setOpen] = useState(false);
  var [query, setQuery] = useState("");
    var ignoreFirstRender = useRef();
    ignoreFirstRender = true;
    var hideClass = "";
  var reset = props.reset;


  function handlePress(e) {
    console.log("test");

    return null
  }
    useEffect(() => {
        /*
        if (open && !ignoreFirstRender) {
            document.getElementById("searchInput").classList.remove("hide")
            alert("We are in useEffect")
        } else if (!open) {
            document.getElementById("searchInput").classList.add("hide")
        }*/
    }, [open]);
    return (
        <div className={"searchbar_container"}>
          <input id={'searchInput'} type={"text"} placeholder={"Rechercher..."}
                 onChange={handleChange}/>
            <label className={'headerSearchSubmitWrapper'}>
              <input type={"submit"} className={'headerSearchSubmit'}/>
              <Link to={"/recherche?q=" + query} onClick={props.reset}> <Bouton type={"main"} contenu={<MdSearch/>}
                                                                                modal={props.modal}
                                                                                onClick={props.toggle}/></Link>
            </label>
        </div>
    );

  function handleChange(event) {

    setQuery(event.target.value)

  }


}

export default SearchBar;
