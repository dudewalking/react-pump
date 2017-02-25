import React from "react";
import {ButtonGroup} from "react-bootstrap";
import Controller from "./controller.jsx";

export default class PumpControllers extends React.Component {
    _compare(controller) {
        this.props.compare(controller);
    }

    render() {
        const buttons = [...this.props.controllers].map((controller) => {
            return (
                <Controller key={controller.id}
                            controller={controller}
                            isSafe={this.props.isSafe}
                            isFull={this.props.isFull}
                            isAbleToDrain={this.props.isAbleToDrain}
                            compare={this._compare.bind(this)}/>
            );
        });
        return (
            <ButtonGroup className="controllers">
                {buttons}
            </ButtonGroup>
        );
    }
}