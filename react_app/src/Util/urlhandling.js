import React from 'react';
import {useLocation} from "react-router-dom";

function useParametersFromURL() {
  return new URLSearchParams(useLocation().search);
}

export default function useGetParameters(...namesOfParameters) {
  var parameters = useParametersFromURL();
  var objectContainingParameters = {};
  for (let i = 0; i < namesOfParameters.length; i++) {
    let name = namesOfParameters[i]
    let value = parameters.get(name)
    objectContainingParameters[name] = value;
  }

  return objectContainingParameters;

}
