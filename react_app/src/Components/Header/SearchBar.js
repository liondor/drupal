import React, {useEffect, useRef, useState} from 'react'
import {MdSearch} from 'react-icons/md'
import Bouton from "../Bouton";


function SearchBar(props) {
    var [open, setOpen] = useState(false)
    var ignoreFirstRender = useRef();
    ignoreFirstRender = true;
    var hideClass = "";
    if (props.size === "small") {
        hideClass = "hide"
    }
    const handleOpen = () => {
        alert("Why")
        setOpen(!open)
        ignoreFirstRender = false;
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
            <input id={'searchInput'} className={"hide"} type={"text"} placeholder={"Rechercher..."}/>
            <label className={'headerSearchSubmitWrapper'}>
                <input type={"submit"} className={'headerSearchSubmit'}/>
                <Bouton type={'main'} contenu={<MdSearch onClick={() => handleOpen}/>}/>
            </label>
        </div>
    );


}

export default SearchBar;
