import React from 'react';
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";

export default class BigHeader extends React.Component {

    render() {
        return (
            <>
                <div className={"header grid"} id={"header"}>
                    <div className={"logo_container"}>
                      <Link to="/"><img className={"logo"}
                                        src={"api/sites/default/files/default_images/Logo.png"}/></Link>
                    </div>
                    <div className={"searchbar_container"}>
                        <SearchBar/>
                    </div>
                    <div className={"menu_disposition"}>
                      <div id={"menuBig"} className={"grid3 gridCenter  majuscule"}>
                            <div style={{position: "relative"}}>
                                <Link className={"menu goldenHover"} to="/outilsMissions">
                                    Outils numériques & nos missions
                                </Link>
                            </div>
                            <div style={{position: "relative"}}>
                                <Link className={" menu goldenHover "} to="/about">Qui sommes-nous</Link>
                            </div>
                            <div style={{position: "relative"}}>
                                <Link className={" menu goldenHover"} to="/projets">Nos projets</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div id={"offset"} className={"offset"}/>
            </>

        );
    }

}
