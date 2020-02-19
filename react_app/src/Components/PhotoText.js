import React, {useRef, useState} from 'react'
import {getImageURL, getItem} from "../Util/apiHandling";

const PhotoText = () => {
  let [nodeDirecteur, setNodeDirecteur] = useState(null);
  let [imageURL, setImageURL] = useState("");
  let hasCalledAPI = useRef(false);
  let message = "";
  if (!hasCalledAPI.current) {
    getItem('personnel', "39b02403-22f9-4587-b896-4a3c57cd5e6d", setNodeDirecteur, preventSeveralAPICalls);

  }

  function preventSeveralAPICalls() {
    hasCalledAPI.current = true
  }

  if (nodeDirecteur) {
    if (nodeDirecteur.attributes) {
      message = nodeDirecteur.attributes.field_message
    }
    if (nodeDirecteur.relationships && !imageURL) {
      getImageURL(nodeDirecteur.relationships, setImageURL)
    }
  }
  return (
        <div className={"photoText"}>
          <div className={"accueilPhoto"}>
            {
              imageURL ? <img id={"photoAccueil"} src={imageURL}/> : ""
            }
          </div>
            <div className={"accueilText"}>
              <h2 className={"titreSection"}>Le mot du directeur</h2>
              <p>
                {nodeDirecteur ? message : ""}
              </p>

            </div>

        </div>
    )

}
export default PhotoText;
