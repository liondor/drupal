import React, {useEffect, useRef, useState} from 'react'
import {useLocation} from "react-router-dom";
import ListLinks from "./ListLinks";
import BarreDeRecherche from "./Header/BarreDeRecherche";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 *
 *
 * */
const Recherche = () => {
  var [resultatRecherche, setResultatRecherche] = useState(null);
  var isAppelAPIFait = useRef(false);

  function recherche(texteRecherche) {
    if (!isAppelAPIFait.current) {
      let url = "http://localhost:8900/api/jsonapi/index/default_index";
      if (texteRecherche !== "") {
        url += '?filter[fulltext]=' + texteRecherche
      }
      fetch(url,
        {headers: {'Accept': 'application/vnd.api+json'},}
      ).then(results => results.json()).then(jsonResponse => jsonResponse.data
      ).then(
        listeDuContenuTrouve => {
          var listeContenantLesChampsQuiNousInteresse = listeDuContenuTrouve.map(function (elementDeLaListe) {
            var donneesDeLElement = {
              type: elementDeLaListe.type,
              titre: elementDeLaListe.attributes.title,
              id: elementDeLaListe.id,
              date: elementDeLaListe.attributes.created,
            };
            if (elementDeLaListe.attributes.body) {
              if (elementDeLaListe.attributes.body.value) {
                donneesDeLElement.content = elementDeLaListe.attributes.body.value;
              }
            } else if (elementDeLaListe.description) {
              donneesDeLElement.content = elementDeLaListe.description;
            }

            return (donneesDeLElement)
            }
          );

          return listeContenantLesChampsQuiNousInteresse
        }
      ).then(res => {
        setResultatRecherche(res);
        isAppelAPIFait.current = true
      })
    }
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function searchAgain() {
    if (isAppelAPIFait) {
      isAppelAPIFait.current = false;
    }
  }

  function DisplayQuery() {
    let query = useQuery();
    let texteRecherche = "";
    texteRecherche = query.get("q");
    recherche(texteRecherche);
    let resultatRecherche;
    if (resultatRecherche !== null) {

      resultatRecherche = resultatRecherche.map(node => <ListLinks key={node.id} id={node.id} titre={node.titre}
                                                       content={node.content} date={node.date}
                                                       type={node.type.substring(6)}/>)
    }

    return (
      <>
        <hr/>
        {isAppelAPIFait.current ? resultatRecherche : <CircularProgress/>}
      </>
    );
  }

  useEffect
  (() => {
      let barreRechercheDuHeader = document.querySelector("header .searchbar_container");
      if (barreRechercheDuHeader) {
        barreRechercheDuHeader.classList.add('hide')
      }
      let barreRechercheDePageRecherche = document.querySelector("#searchPageSearchBar .searchbar_container");
      let inputDeBarreRechercheDePageRecherche = document.querySelector("#searchPageSearchBar .searchbar_container");
      barreRechercheDePageRecherche.classList.add('searchPageSearchBar');
      inputDeBarreRechercheDePageRecherche.classList.add('searchPageSearchBarInput');

      return () => {
        if (barreRechercheDuHeader) {
          barreRechercheDuHeader.classList.remove("hide")
        }
      }
    }
    , []
  );
  return (
    <>
      <div id={'searchPageSearchBar'}>
        <BarreDeRecherche reset={searchAgain}/>
      </div>
      <DisplayQuery/>
    </>

  );
};
export default Recherche;
