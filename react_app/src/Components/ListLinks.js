import React from 'react'
import {Link} from "react-router-dom";

const ListLinks = (props) => {
  function ConditionnalRendering() {
    let child;
    if (typeof props.titre !== "undefined" && typeof props.type !== "undefined") {
      child = (
        <Link to={'presentation?id=' + props.id + "&type=" + props.type}>
          <div className={"searchResult"}>
            <h3>{props.titre}</h3>
            <span className={'unimportantText'}>{props.date.substring(0, 10)} </span>
          </div>
        </Link>
      )
    } else {
      child = (<></>)
    }

    return child;

  }

  return (
    <>
      {<ConditionnalRendering/>}
    </>
  )

};
export default ListLinks
