import React from "react";
import {ProgressBar} from "react-bootstrap";

export default class Progress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    _updateStatus() {
        this.props.updateStatus();
    }

    render() {
        if (this.props.isSafe) {
            if (this.state.progress < 100) {
                setTimeout((() => {
                    this.setState({progress: this.state.progress + 1});
                }), 150);
            } else {
                clearTimeout();
                setTimeout(() => this._updateStatus(), 100);
            }
        }
        return (
            <ProgressBar style={{height: 20, width: 600}}
                         min={0}
                         max={100}
                         active
                         striped
                         now={this.state.progress}
                         label={`${this.state.progress}%`}/>
        );
    }
}