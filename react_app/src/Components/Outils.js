import React from 'react'
import {Link} from "react-router-dom";
import parse from 'html-react-parser'

/**
 *
 *
 *
 * */
const Outil = (props) => {
  var linkParameters = {};

  if (!props.type.localeCompare('categorie')) {
    linkParameters = {
      className: "outil whiteText",
      to: '/categorie?id=' + props.id + '&type=' + props.type,
    }
  } else {
    linkParameters = {
      className: "outil whiteText",
      to: '/presentation?id=' + props.id + '&type=' + props.type + '&origin=' + props.origin,
    }

  }
    return (
      <Link {...linkParameters} >
            <div className={"outilImageTitre"}>
              <img src={"http://localhost:8900" + props.urlImage} style={{width: "auto"}}/>
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
              {props.description ? parse(props.description) : ""}
            </div>

        </Link>
    );
};

export default Outil
