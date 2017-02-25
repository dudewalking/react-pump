import React from "react";
import Toggle from "react-toggle";

export default class Controller extends React.Component {

    _calculate() {
        this.props.compare(this.props.controller);
    }

    render() {
        return (
            <label>
                <Toggle
                    checked={!!this.props.controller.isOpen}
                    icons={false}
                    disabled={this.props.isSafe || this.props.isFull || this.props.isAbleToDrain}
                    onChange={() => this._calculate()}/>
                <span className="label-text">{this.props.controller.name}</span>
            </label>
        );
    }
}