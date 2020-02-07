import React from 'react'
import Annuaire from "./Annuaire";
import Map from "./Map";
import Formulaire from "./Formulaire";

const Contact = () => {



  return (
    <div style={{width: '85%'}}>
          <div id={"contact"} className={"grid"}>
            <Formulaire/>
                <Annuaire/>
            </div>
            <Map/>
        </div>
    );

}

export default Contact
