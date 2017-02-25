import React from "react";

export default class Marker extends React.Component {
    render() {
        return (
            <div className={"markers marker-" + this.props.name + " " + this.props.markerColor}/>
        );
    }
}
