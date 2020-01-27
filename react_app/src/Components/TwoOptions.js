import React from 'react'
import {GiGearHammer} from 'react-icons/gi';
import {FaCubes} from 'react-icons/fa'
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";

const TwoOptions = () => {
    return (
        <div className={"twoOptions grid2"}>
            <Link to="/outils">
                <div>
                    <IconContext.Provider value={{className: "optionIcone"}}>
                        <GiGearHammer/>
                    </IconContext.Provider>
                    <h3> Outils numériques </h3>
                </div>
            </Link>

            <Link to="/missions">
                <div>

                    <IconContext.Provider value={{className: "optionIcone"}}>
                        <FaCubes/>
                    </IconContext.Provider>
                    <h3> Nos missions</h3>
                </div>

            </Link>


        </div>
    );

}
export default TwoOptions