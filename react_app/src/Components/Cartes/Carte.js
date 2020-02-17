import React from 'react';
import './Carte2.css'
import {Link} from "react-router-dom";

export default function Carte(props) {

        return (
          <Link to={'/outil?id=' + props.id + '&type=' + props.type}>
            <div className={"carte"}>
                {
                    props.urlImage ? <img alt={"Photo de l'université"} src={"http://localhost:8900" + props.urlImage}
                                          className={"thumbnail"}/> :
                      <img alt={"Photo de l'université"} className={"thumbnail"} src={
                        "/api/sites/default/files/default_images/universite-561821.jpg"}/>
                }
                <div className={"tag"}>
                    <h5 className={"goldenText "}> Etudiants Visiteurs Personnels</h5>
                </div>
                <div className={"titre_carte"}>
                    {
                        props.titre ? <h4> {props.titre}</h4> :
                            <h4> Découvrez les outils numériques de l'université</h4>

                    }
                </div>
            </div>
          </Link>
        );

}
