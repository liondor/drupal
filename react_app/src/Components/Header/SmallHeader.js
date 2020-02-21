import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {MdMenu} from 'react-icons/md'
import SideMenu from "./SideMenu";
import BarreDeRecherche from "./BarreDeRecherche";

const SmallHeader = () => {
  const [aClique, setAClique] = useState(false);

  function ouvreModal() {
    setAClique(currentState => !currentState);
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
          <BarreDeRecherche toggle={ouvreModal} modal={true}/>
        </div>
      </div>)
  };

  return (
    <>
      <div className={"header grid"}>
        <div className={"menu_disposition styleSVG"} onClick={ouvreModal}>
          <MdMenu/>
        </div>

        <div className={"logo_container"}>
          <Link to="/">
            <img alt={"Logo de la DSIN"} className={"logo"}
                 src={"api/sites/default/files/default_images/Logo.png"}/>
          </Link>
        </div>
      </div>
      <SideMenu show={aClique} toggle={ouvreModal} message={""} content={menu}/>
    </>
  );


};
export default SmallHeader;
