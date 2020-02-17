import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {MdMenu} from 'react-icons/md'
import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";

/*
let menu;
menu = (toggle) => {
    return (
        <div className={"grid headerSideMenu"}>
            <div className={"goldenText menu"}>
                <Link className={"goldenText menu"} onClick={toggle} to="/outilsMissions">
                    Outils numériques & nos missions
                </Link>
            </div>
            <div>
                <Link className={"goldenText menu"} onClick={toggle} to="/about">Qui sommes-nous</Link>
            </div>
            <div>
                <Link className={"goldenText menu"} onClick={toggle} to="/projets">Nos projets</Link>
            </div>

            <div className={"searchbar_container"}>
                <SearchBar toggle={openModal}/>
            </div>
        </div>)
};*/

const SmallHeader = () => {
    const [hasClicked, setHasClicked] = useState(false)

  function openModal() {
    setHasClicked(hasClicked => !hasClicked)
  }

  let menu;
  menu = (toggle) => {
    return (
      <div id={"headerSmall"} className={"grid headerSideMenu"}>
        <div className={"goldenText menu"}>
          <Link className={"goldenText menu"} onClick={toggle} to="/outilsMissions">
            Outils numériques & nos missions
          </Link>
        </div>
        <div>
          <Link className={"goldenText menu"} onClick={toggle} to="/about">Qui sommes-nous</Link>
        </div>
        <div>
          <Link className={"goldenText menu"} onClick={toggle} to="/projets">Nos projets</Link>
        </div>

        <div className={"searchbar_container"}>
          <SearchBar toggle={openModal} modal={true}/>
        </div>
      </div>)
  };

  return (
        <>
            <div className={"header grid"} >
                <div className={"menu_disposition styleSVG"} onClick={openModal}>
                    <MdMenu/>
                </div>

                <div className={"logo_container"}>
                    <Link to="/">
                      <img className={"logo"} src={"api/sites/default/files/default_images/Logo.png"}/>
                    </Link>
                </div>
            </div>
            <SideMenu show={hasClicked} toggle={openModal} message={""} content={menu}/>
        </>
    );


}
export default SmallHeader;
