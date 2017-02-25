import React from "react";
import Marker from "./marker.jsx";

export default class Markers extends React.Component {
    render() {
        const markers = [...this.props.controllers].map(function (marker) {
            return <Marker key={marker.id} name={marker.id} markerColor={marker.markerColor}/>;
        });
        return (
            <div>
                {markers}
            </div>
        );
    }
}