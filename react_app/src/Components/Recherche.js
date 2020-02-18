import React, {useEffect, useRef, useState} from 'react'
import {useLocation} from "react-router-dom";
import ListLinks from "./ListLinks";
import SearchBar from "./Header/SearchBar";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * TODO: Restraindre le type de contenu pouvant être trouvé via la recherche
 *
 * */
const Recherche = () => {
  var [results, setResults] = useState(null);
  var searchDone = useRef(false);

  function searchContent(textRequested) {
    if (!searchDone.current) {
      let url = "http://localhost:8900/api/jsonapi/index/default_index";
      if (textRequested !== "") {
        url += '?filter[fulltext]=' + textRequested
      }
      fetch(url,
        {headers: {'Accept': 'application/vnd.api+json'},}
      ).then(results => results.json()).then(jsonResponse => jsonResponse.data
      ).then(
        listOfNodes => {
          var temp = listOfNodes.map(function (node) {
            var data = {
              type: node.type,
              titre: node.attributes.title,
              id: node.id,
              date: node.attributes.created,
            };
            if (node.attributes.body) {
              if (node.attributes.body.value) {
                data.content = node.attributes.body.value;
              }
            } else if (node.description) {
              data.content = node.description;
            }

            return (data)
            }
          );

          return temp
        }
      ).then(res => {
        setResults(res);
        searchDone.current = true
      })
    }
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function searchAgain() {
    if (searchDone) {
      searchDone.current = false;
      console.log("You can search again !")
      //   setResults(null)

    }
  }

  function DisplayQuery() {
    let query = useQuery();
    let text = "";
    text = query.get("q");
    searchContent(text);
    let researchResults;
    if (results !== null) {

      researchResults = results.map(node => <ListLinks key={node.id} id={node.id} titre={node.titre}
                                                       content={node.content} date={node.date}
                                                       type={node.type.substring(6)}/>)
    }

    return (
      <>
        <hr/>
        {searchDone.current ? researchResults : <CircularProgress/>}
      </>
    );
  }

  useEffect
  (() => {
      let header = document.querySelector("header .searchbar_container");
      if (header) {
        header.classList.add('hide')
      }
      let goodSearchBar = document.querySelector("#searchPageSearchBar .searchbar_container");
      console.log(goodSearchBar);
      let input = document.querySelector("#searchPageSearchBar .searchbar_container");
      goodSearchBar.classList.add('searchPageSearchBar');
      input.classList.add('searchPageSearchBarInput');

      return () => {
        if (header) {
          header.classList.remove("hide")
        }
      }
    }

    , []
  );
  return (
    <>
      <div id={'searchPageSearchBar'}>
        <SearchBar reset={searchAgain}/>
      </div>
      <DisplayQuery/>
    </>

  );

};
export default Recherche;
