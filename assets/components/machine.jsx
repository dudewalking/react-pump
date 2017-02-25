import React from "react";
import Markers from "./markers.jsx";

export default class Machine extends React.Component {
    render() {
        return (
            <div className="center-side">
                <Markers controllers={this.props.controllers}/>
                <div className={this.props.isSafe ? "water" : ""}/>
                <img src="./assets/svg/final-pump.svg" width="500px" height="500px"/>
            </div>
        );
    }
}