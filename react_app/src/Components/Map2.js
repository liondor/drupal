import React, {useState} from "react";
import ImageMapper from 'react-image-mapper';
import Shoelcher from './IMG/schoelcher.jpg'
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";


function Map2() {
    const initialPosShoelcher = [{
        _id: "CUR",
        shape: "circle",
        coords: [333, 575, 10],
        preFillColor: "blue"
    }, {
        _id: "ISEF",
        shape: "circle",
        coords: [377, 209, 10],
        preFillColor: "green"
    }, {
        _id: "BU",
        shape: "circle",
        coords: [412, 421, 10],
        preFillColor: "blue"
    }, {
        _id: "UFR LETTRES",
        shape: "circle",
        coords: [402, 340, 10],
        preFillColor: "blue"
    },]
    const initialPosFouillole = [{
        _id: "1",
        shape: "circle",
        coords: [486, 127, 10],
        preFillColor: "blue"
    }, {
        _id: "2",
        shape: "circle",
        coords: [480, 480, 10],
        preFillColor: "green"
    }, {
        _id: "3",
        shape: "circle",
        coords: [216, 402, 10],
        preFillColor: "blue"
    }, {
        _id: "4",
        shape: "circle",
        coords: [902, 340, 10],
        preFillColor: "blue"
    }, {
        _id: "5",
        shape: "circle",
        coords: [1175, 108, 10],
        preFillColor: "blue"
    }]

    const [carte, setCarte] = useState(Shoelcher)
    const [nom, setNom] = useState("test")
    const [width, setWidth] = useState(window.innerWidth * .6)
    const [informaticiens, setInformaticiens] = useState(initialPosShoelcher)

    function searchClosestPoint(e) {
        setInformaticiens(initialPosFouillole)
        setNom('Tasty')
        // setWidth(w=>w+1)
        //setWidth(w=>w-1)
    }

    return (
        <>
            <h5>Besoin d'aide ? Trouver l'informaticien le plus proche ! </h5>
            <InputLabel id="labelCampus">Campus</InputLabel>
            <Select labelId="labelCampus" value={carte}>
                <MenuItem value={"fouillole"}>Campus de Fouillole</MenuItem>
                <MenuItem value={"shoelcher"}>Campus de Schoelcher</MenuItem>
            </Select>
            <div id={"testMap"} onClick={searchClosestPoint}>
                <ImageMapper
                    clas={nom}
                    src={carte}
                    map={{name: "test", areas: informaticiens}}
                    width={width}
                    imgWidth={630}
                />
            </div>
        </>
    );

}

export default Map2;
