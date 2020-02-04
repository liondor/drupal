import React from 'react'
import {Link} from "react-router-dom";

const ListLinks = (props) => {
  function ConditionnalRendering() {
    let child;
    if (typeof props.titre !== "undefined" && typeof props.type !== "undefined") {
      if (props.type === undefined) {
        console.log(props.titre)
      }
      child = (<Link to={'outil?id=' + props.id + "&type=" + props.type}><h5>{props.titre}</h5></Link>)
    }
    return child;

  }

  return (
    <>

      {<ConditionnalRendering/>}
    </>
  )

}
export default ListLinks
