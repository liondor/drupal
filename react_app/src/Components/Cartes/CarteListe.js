import React from 'react';
import Carte from "./Carte";

export default class CarteListe extends React.Component {
    render() {
        let {data} = this.props;
        return (
            <div>
                <h1>Here are your best Travel Destinations</h1>
                {data !== null &&
                data !== undefined &&
                data.length > 0 ?
                    data.map(item => <Carte {...item} key={item.id}/>)
                    :
                    <div>No destinationnnns found.</div>
                }
            </div>
        );
    }
}
