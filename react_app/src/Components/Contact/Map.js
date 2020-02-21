import React, {useEffect, useRef, useState} from "react";
import ImageMapper from 'react-image-mapper';
import Guadeloupe from '../IMG/Guadeloupe.png'
import Shoelcher from '../IMG/schoelcher.jpg'
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

/**But : Carte intéractive montrant où se trouve le technicien le plus proche de l'endroit où l'utilisateur a cliqué
 * Entrées : Aucune
 * */
function Map() {
  const initialPosShoelcher = [{
    _id: "CUR",
    shape: "circle",
    coords: [333, 575, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false

  }, {
    _id: "ISEF",
    shape: "circle",
    coords: [377, 209, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }, {
    _id: "BU",
    shape: "circle",
    coords: [412, 421, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }, {
    _id: "UFR LETTRES",
    shape: "circle",
    coords: [402, 340, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  },];
  const initialPosFouillole = [{
    _id: "1",
    shape: "circle",
    coords: [486, 127, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }, {
    _id: "2",
    shape: "circle",
    coords: [480, 480, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }, {
    _id: "3",
    shape: "circle",
    coords: [216, 402, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }, {
    _id: "4",
    shape: "circle",
    coords: [902, 340, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }, {
    _id: "5",
    shape: "circle",
    coords: [1175, 108, 10],
    preFillColor: "blue",
    fillColor: 'red',
    active: false
  }];

  const WIDTH_CARTE_SHOELCHER = 630;
  const WIDTH_CARTE_FOUILLOLE = 1274;


  const technicienLePlusProche = useRef([9999, 9999]);
  const [positionInitiale, setpositionInitiale] = useState(initialPosShoelcher);
  const positionTechniciens = useRef(positionInitiale);
  const [carte, setCarte] = useState(Shoelcher);
  const [width, setWidth] = useState(window.innerWidth * .6);
  const [initialWidth, setInitialWidth] = useState(WIDTH_CARTE_SHOELCHER);
  const ratio = width / initialWidth;

  function searchClosestPoint(e) {
    var posCursor = getCursorPosition(e);
    let tempInformaticiens = getPositionWithRightRatio();
    let closestInfo = getClosestInformaticien(tempInformaticiens, posCursor);
    technicienLePlusProche.current = closestInfo;
    updateTechnicien(closestInfo)
  }

  function getPositionWithRightRatio() {
    let duplicate = cloneDeep(positionTechniciens.current);
    duplicate = duplicate.map(objet => {
      objet.coords[0] = objet.coords[0] * ratio;
      objet.coords[1] = objet.coords[1] * ratio;
      return objet
    });

    return duplicate
  }

  function getClosestInformaticien(arrayOfInformaticien, positionCurseur) {
    let closestInfo = null;
    let dist = 9999;
    let temp = 9999;
    arrayOfInformaticien.forEach(technicien => {
      let positionTechnicien = technicien.coords;
      temp = distanceEuclidienne(positionTechnicien, positionCurseur);
      if (temp < dist) {
        dist = temp;
        closestInfo = positionTechnicien
      }
    });
    return closestInfo;
  }

  function getCursorPosition(e) {
    var rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x, y]

  }

  function distanceEuclidienne(point1, point2) {
    let result = 0;
    result = puissance2(point1[0] - point2[0]);
    result += puissance2(point1[1] - point2[1]);
    result = Math.sqrt(result);
    return result
  }


  function puissance2(nombre) {
    return Math.pow(nombre, 2)
  }

  function changeCampus(campusSelectionne) {
    console.log("changeCampus");
    var image;
    var positionDeBase;
    if (campusSelectionne.target.value.localeCompare("fouillole") === 0) {
      image = Guadeloupe;
      setInitialWidth(WIDTH_CARTE_FOUILLOLE);
      positionDeBase = cloneDeep(initialPosFouillole)
    } else {
      image = Shoelcher;
      setInitialWidth(WIDTH_CARTE_SHOELCHER);
      positionDeBase = cloneDeep(initialPosShoelcher)
    }
    setCarte(image);
    setpositionInitiale(positionDeBase)
  }

  function updateTechnicien(positionDuPlusProche) {
    let listePositionTechniciens;
    var technicienChoisi = positionDuPlusProche;
    listePositionTechniciens = cloneDeep(positionInitiale);
    listePositionTechniciens = listePositionTechniciens.map(positionTechnicien => {
      let coordonneesAEchelle = [positionTechnicien.coords[0] * ratio, positionTechnicien.coords[1] * ratio, positionTechnicien.coords[2]];
      if (isEqual(coordonneesAEchelle, technicienChoisi)) {
        positionTechnicien.active = true;
        positionTechnicien.preFillColor = positionTechnicien.fillColor
      } else {
        positionTechnicien.active = false;
        positionTechnicien.preFillColor = "blue"
      }
      return positionTechnicien
    });
    if (listePositionTechniciens !== undefined)
      positionTechniciens.current = listePositionTechniciens;
    setWidth(w => w - .01)

  }

  function renderMap() {
    var map = {name: "test", areas: positionTechniciens.current};
    return (<ImageMapper
      clas="map"
      src={carte}
      map={map}
      width={width}
      imgWidth={initialWidth}
    />)
  }

  useEffect(() => {
    updateTechnicien(technicienLePlusProche.current);
  }, [positionInitiale, positionTechniciens, technicienLePlusProche]);

  return (
    <div className={"contact_Map"}>
      <h5>Besoin d'aide ? Trouver le technicien le plus proche ! </h5>
      <InputLabel id="labelCampus">Campus</InputLabel>
      <Select labelId="labelCampus" value={carte} onChange={changeCampus}>
        <MenuItem value={"fouillole"}>Campus de Fouillole</MenuItem>
        <MenuItem value={"shoelcher"}>Campus de Schoelcher</MenuItem>
      </Select>
      <div id={"testMap"} onClick={searchClosestPoint}>
        {renderMap()}

      </div>
    </div>
  );


}

export default Map;
