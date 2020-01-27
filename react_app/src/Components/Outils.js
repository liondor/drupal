import React from 'react'
import {Link} from "react-router-dom";


const Outil = (props) => {
    return (
        <Link className={"outil whiteText"} to={"/exempleOutil"}>
            <div className={"outilImageTitre"}>
                <img src={"http://localhost:8900" + props.urlImage}/>
                {/*
                <div className={"outilImageContainer whiteText"}>

                    <IconContext.Provider value={{className: "outilIcone"}}>
                        <div>
                            <AiOutlineUser/>
                        </div>
                    </IconContext.Provider>

                </div>
                */}
                <div className={"outilTitre"}>
                    <h3 className={"bold majuscule"}> {props.titre}</h3>
                </div>
            </div>
            <div className={"outilDescription lessImportantText"}>
                <p>{props.description}</p>
            </div>

        </Link>
    );
}

export default Outil