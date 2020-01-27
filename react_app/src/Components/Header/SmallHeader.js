import React, {useState} from 'react'
import {Link} from "react-router-dom";
import logo from '../Logo.png';
import {MdMenu} from 'react-icons/md'
import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";


let menu;
menu = (toggle) => {
    return (
        <>
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
                <SearchBar/>
            </div>
        </>)
};

const SmallHeader = () => {
    const [hasClicked, setHasClicked] = useState(false)
    return (
        <>
            <div className={"header"}>
                <div className={"menu_disposition styleSVG"} onClick={openModal}>
                    <MdMenu/>
                </div>

                <div className={"logo_container"}>
                    <Link to="/">
                        <img className={"logo"} src={logo}/>
                    </Link>
                </div>
            </div>
            <SideMenu show={hasClicked} toggle={openModal} message={""} content={menu}/>
        </>
    );
    // You can think of these components as "pages"
// in your app.
    function openModal() {
        setHasClicked(hasClicked => !hasClicked)
    }


}
export default SmallHeader;