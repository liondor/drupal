import React from 'react'
import {Link} from "react-router-dom";
import parse from 'html-react-parser'

const ListLinks = (props) => {
  function ConditionnalRendering() {
    let child;
    if (typeof props.titre !== "undefined" && typeof props.type !== "undefined") {
      if (props.type === undefined) {
        console.log(props.titre)
      }
      //    console.log(parse(props.content))

      child = (
        <Link to={'outil?id=' + props.id + "&type=" + props.type}>
          <div className={"searchResult"}>
            <h3>{props.titre}</h3>
            <p>{props.date.substring(0, 10)} </p>{props.content ? parse(props.content) : ''}
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

}
export default ListLinks
