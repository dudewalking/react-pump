import React from "react";
import {ProgressBar} from "react-bootstrap";

export default class Progress extends React.Component {
    render() {
        return (
            <ProgressBar style={{height: 20, width: 600,
                visibility: this.props.isSafe ? "visible" : "hidden"}}
                         min={0}
                         max={100}
                         active
                         striped
                         now={this.props.progress}
                         label={`${this.props.progress}%`}/>
        );
    }
}