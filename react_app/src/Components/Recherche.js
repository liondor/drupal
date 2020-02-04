import React, {useRef, useState} from 'react'
import {useLocation} from "react-router-dom";
import ListLinks from "./ListLinks";
import SearchBar from "./Header/SearchBar";
import CircularProgress from "@material-ui/core/CircularProgress";

const Recherche = () => {
  var [results, setResults] = useState(null)
  var searchDone = useRef(false)

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
              return ({
                type: node.type,
                titre: node.attributes.title,
                id: node.id,
              })
            }
          )
          return temp
        }
      ).then(res => {
        setResults(res)
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
    searchContent(text)
    let researchResults;
    if (results !== null) {

      researchResults = results.map(node => <ListLinks key={node.id} id={node.id} titre={node.titre}
                                                       type={node.type.substring(6)}/>)
    }
    return (
      <>
        {searchDone.current ? researchResults : <CircularProgress/>}
      </>
    );
  }

  return (
    <>
      <SearchBar reset={searchAgain}/>
      <DisplayQuery/>
    </>

  );

}
export default Recherche;
