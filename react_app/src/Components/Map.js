import React, {useEffect, useRef, useState} from "react";
import ImageMapper from 'react-image-mapper';
import Guadeloupe from './IMG/Guadeloupe.png'
import Shoelcher from './IMG/schoelcher.jpg'
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import _ from 'lodash'

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
    },]
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
    }]


    const WIDTH_CARTE_SHOELCHER = 630;
    const WIDTH_CARTE_FOUILLOLE = 1274;


    const closestInformaticien = useRef([9999, 9999])
    const [initialPos, setInitialPos] = useState(initialPosShoelcher)
    const informaticiens = useRef(initialPos)
    const [mapObjet, setMapObjet] = useState({name: "Carte du campus", areas: informaticiens})
    const [carte, setCarte] = useState(Shoelcher)
    const [width, setWidth] = useState(window.innerWidth * .6)
    const [initialWidth, setInitialWidth] = useState(WIDTH_CARTE_SHOELCHER)
    //const width = 500;
    const ratio = width / initialWidth

    function test() {
        var temp = -2;
        var array = [2, 2]
        var array1 = [-2, -2]
        var array2 = [1, -2]
        console.log({
            "Le plus proche": closestInformaticien,
            "Liste des informaticiens ": informaticiens,
            "Position de départ  ": initialPos,
            "Largeur actuelle ": width,
            "Largeur initiale ": initialWidth
        })
    }

    function searchClosestPoint(e) {
        var posCursor = getCursorPosition(e)
        let tempInformaticiens = getPositionWithRightRatio();
        //  let diff = tempInformaticiens.map(technicien => distanceEuclidienne(technicien.coords, posCursor))
        //   console.log(diff)
        let closestInfo = getClosestInformaticien(tempInformaticiens, posCursor)
        //    console.log("Map : Hey React, bro, you mind re-rendering me with closestInformaticien=" + closestInfo + " instead of " + closestInformaticien + " ? Thanks !")
        closestInformaticien.current = closestInfo;
        updateInformaticien(closestInfo)
        //console.log("Employé le plus proche trouvé en " + closestInformaticien + "Vérification au cas ou " + closestInfo)
    }

    function getPositionWithRightRatio() {
        let duplicate = _.cloneDeep(informaticiens.current);
        duplicate = duplicate.map(objet => {
            objet.coords[0] = objet.coords[0] * ratio;
            objet.coords[1] = objet.coords[1] * ratio;
            return objet
        })

        return duplicate
    }

    function getClosestInformaticien(arrayOfInformaticien, positionCurseur) {
        let closestInfo = null;
        let dist = 9999;
        let temp = 9999;
        arrayOfInformaticien.forEach(technicien => {
            let positionTechnicien = technicien.coords
            temp = distanceEuclidienne(positionTechnicien, positionCurseur);
            if (temp < dist) {
                dist = temp
                closestInfo = positionTechnicien
                //    console.log(posBureau + "...")
            }
        })
        return closestInfo;
    }

    function getCursorPosition(e) {
        var rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        //console.log("J'ai cliqué en :", x, y)
        return [x, y]

    }

    function distanceEuclidienne(point1, point2) {
        let result = 0;
        result = puissance2(point1[0] - point2[0])
        result += puissance2(point1[1] - point2[1])
        result = Math.sqrt(result)
        //  console.log("Distance entre ", point1, " et ", point2, result)
        return result
    }

    function arrayEgalite(array1, array2) {
        let isEqual = true
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                isEqual = false;
            }
        }
        return isEqual;
    }

    function puissance2(nombre) {
        return Math.pow(nombre, 2)
    }

    function changeCampus(campusSelectionne) {
        console.log("changeCampus")
        var image;
        var positionDeBase
        if (campusSelectionne.target.value.localeCompare("fouillole") === 0) {
            image = Guadeloupe;
            setInitialWidth(WIDTH_CARTE_FOUILLOLE)
            positionDeBase = _.cloneDeep(initialPosFouillole)
        } else {
            image = Shoelcher;
            setInitialWidth(WIDTH_CARTE_SHOELCHER);
            positionDeBase = _.cloneDeep(initialPosShoelcher)
        }
        setCarte(image)
        setInitialPos(positionDeBase)
        // setInformaticiens(positionDeBase)
    }

    function updateInformaticien(positionDuPlusProche) {
        let newInformaticiens
        var choosenOne = positionDuPlusProche
        //      if (choosenOne[0] !==9999) {
        newInformaticiens = _.cloneDeep(initialPos)
        newInformaticiens = newInformaticiens.map(individu => {
            let scaledCoords = [individu.coords[0] * ratio, individu.coords[1] * ratio, individu.coords[2]]
            //     console.log("UseEffect : In here, for" + individu._id + " scaledCoords=" + scaledCoords + " and choosenOne=" + choosenOne + " , so comparing them give us " + _.isEqual(scaledCoords, choosenOne))
            if (_.isEqual(scaledCoords, choosenOne)) {
                individu.active = true
                individu.preFillColor = individu.fillColor

            } else {
                individu.active = false
                individu.preFillColor = "blue"

            }
            return individu
        })
        //      console.log("Map : Hey React, bro, you mind re-rendering me with informaticiens=" + JSON.stringify(newInformaticiens) + " instead of " + JSON.stringify(informaticiens) + " ? Thanks, you're a lifesaver !")
        // setInformaticiens(newInformaticiens)
        if (newInformaticiens !== undefined)
            informaticiens.current = newInformaticiens

        setMapObjet(m => ({...m, areas: informaticiens.current}))
        setWidth(w => w - .01)

        //console.log("Just sandwiching setInformaticiens to make sure this line of code is read")
        //    }
    }

    function renderMap() {
        //     console.log("This should get triggered on each re-render", informaticiens.current)
        var map = {name: "test", areas: informaticiens.current}
        return (<ImageMapper
            clas="map"
            src={carte}
            map={map}
            width={width}
            imgWidth={initialWidth}
        />)
    }

    useEffect(() => {
        //console.log("UseEffect : I'm from the render using closestInformaticien = "+ closestInformaticien.current)
        updateInformaticien(closestInformaticien.current);
    }, [initialPos, informaticiens, closestInformaticien])

    return (
        <div className={"contact_Map"}>
            <h5>Besoin d'aide ? Trouver l'informaticien le plus proche ! </h5>
            <InputLabel id="labelCampus">Campus</InputLabel>
            <Select labelId="labelCampus" value={carte} onChange={changeCampus}>
                <MenuItem value={"fouillole"}>Campus de Fouillole</MenuItem>
                <MenuItem value={"shoelcher"}>Campus de Schoelcher</MenuItem>
            </Select>
            <div id={"testMap"} onClick={searchClosestPoint}>
                {renderMap()}

            </div>
            {/*<p id={"closer"}>{JSON.stringify([...informaticiens])}</p>
            console.log(document.querySelector("div#testMap div"))*/}
        </div>
    );


}

export default Map;