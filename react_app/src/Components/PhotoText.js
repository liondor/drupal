import React from 'react'
import photo from './IMG/photo1.jpg'

const PhotoText = () => {
    return (
        <div className={"photoText"}>
            <div className={"accueilPhoto"}><img id={"photoAccueil"} src={photo}/></div>
            <div className={"accueilText"}>
                <h2 className={"titreSection"}> Le mot du directeur</h2>
                <p> Ut id ligula non mi vehicula condimentum sit amet nec metus. Nulla non est aliquam, dapibus justo
                    eu, efficitur felis. Quisque erat dolor, varius vitae tellus eget, fringilla hendrerit nibh. In
                    elementum felis quis orci sagittis, ac placerat elit ultricies. Donec sed facilisis ex. In hendrerit
                    sed urna ut molestie. Sed dolor dolor, facilisis ut condimentum eget, maximus a sem. In fermentum
                    diam lacus, vel faucibus magna mattis in. Nullam eget euismod justo. Fusce vel pharetra nisl, vitae
                    hendrerit justo. Cras dignissim, mauris sit amet tincidunt luctus, orci sapien maximus ante, eu
                    imperdiet diam est in quam. Quisque rhoncus rutrum feugiat. <br/><br/>

                    In dignissim mauris faucibus sem dictum facilisis. In ac rutrum magna. Pellentesque at erat
                    hendrerit, sollicitudin dolor at, euismod lorem. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Mauris a orci sit amet arcu pulvinar imperdiet. Duis
                    vestibulum, turpis at sollicitudin imperdiet, tellus ante ultricies nulla, faucibus porttitor urna
                    urna et diam. Donec viverra urna id sem dictum vehicula. Sed tristique, felis laoreet interdum
                    venenatis, libero augue pharetra magna, nec faucibus diam dolor sed ligula. Donec vel erat a urna
                    consequat finibus. Cras vitae dolor at purus blandit tempus. Integer consectetur mi volutpat est
                    euismod vestibulum et tempus metus. Vivamus et orci at dui eleifend fringilla ac eu tellus. Ut
                    luctus, ex quis scelerisque placerat, purus sapien rutrum diam, et efficitur nisi tortor ut libero.
                    Ut metus libero, pharetra quis accumsan elementum, dignissim ultrices augue.</p>
            </div>

        </div>
    )

}
export default PhotoText;