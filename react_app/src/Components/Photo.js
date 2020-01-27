import React from 'react'
import photo from 'IMG/photo.jpg'

const Photo = () => {
    return (
        <>
            <div>
                <img className={"photo"} src={photo}/>
            </div>
        </>
    );

}

export default Photo;