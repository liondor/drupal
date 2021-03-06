import React from 'react'
import {FaPhone} from 'react-icons/fa'
import {MdMail} from 'react-icons/md'
import Loading from "./Loading";

const PresentationPersonnel = (props) => {
  if (props.nom) {
    return (
      <div>
        <h4> {props.position ? props.position : <Loading/>}</h4>
        <p>{props.nom ? props.nom : <Loading/>} {props.prenom ? props.prenom : ""}</p>
        {props.telephone ? (<div><FaPhone/> : <span> {props.telephone}</span></div>) : ""}
        {props.email ? (<div><MdMail/> : <span>{props.email}</span></div>) : ""}
      </div>
    );
  } else {

    return (
      <Loading/>
    )
  }

};

export default PresentationPersonnel
