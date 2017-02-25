import React from "react";
import {ButtonGroup} from "react-bootstrap";
import Controller from "./controller.jsx";

export default class PumpControllers extends React.Component {
    _compare(controller, isOpened) {
        this.props.compare(controller, isOpened);
    }

    render() {
        const buttons = [...this.props.controllers].map(function (controller) {
            return (
                <Controller key={controller.id}
                            controller={controller}
                            isSafe={this.props.isSafe}
                            controllers={this.props.controllers}
                            compare={this._compare.bind(this)}/>
            );
        }, this);
        return (
            <ButtonGroup className="controllers">
                {buttons}
            </ButtonGroup>
        );
    }
}