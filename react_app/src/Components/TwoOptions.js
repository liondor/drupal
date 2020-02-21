import React from 'react'
import {GiGearHammer} from 'react-icons/gi';
import {FaCubes} from 'react-icons/fa'
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";

const TwoOptions = () => {
    return (
      <div className={"twoOptions grid"}>
            <Link to="/outils">
                <div>
                    <IconContext.Provider value={{className: "optionIcone"}}>
                        <GiGearHammer/>
                    </IconContext.Provider>
                  <h3> Outils numériqus </h3>
                </div>
            </Link>

        <Link to="/outil?id=3440e5f7-f714-438a-b4dd-c01785216cf6&type=page">
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
