import React from "react";
import Toggle from "react-toggle";

export default class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };
    }

    _calculate() {
        this.setState({isOpened: !this.state.isOpened,}, () => {
            this.props.compare(this.props.controller, this.state.isOpened);
        });
    }

    render() {
        return (
            <label>
                <Toggle
                    defaultChecked={this.state.isOpened}
                    icons={false}
                    disabled={this.props.isSafe}
                    onChange={this._calculate.bind(this)}/>
                <span className="label-text">{this.props.controller.name}</span>
            </label>
        );
    }
}