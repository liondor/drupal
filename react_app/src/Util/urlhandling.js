import React from 'react';
import {useLocation} from "react-router-dom";

function useParametersFromURL() {
  return new URLSearchParams(useLocation().search);
}

export default function useGetParameters(...nomsDesParametresVoulu) {
  var parameters = useParametersFromURL();
  var conteneurDesParametres = {};
  for (let i = 0; i < nomsDesParametresVoulu.length; i++) {
    let name = nomsDesParametresVoulu[i]
    let value = parameters.get(name)
    conteneurDesParametres[name] = value;
  }

  return conteneurDesParametres;

}
