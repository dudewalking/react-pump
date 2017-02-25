import React from "react";

export default class Status extends React.Component {
    render() {
        return (
            <div className="right-side">
                <p>Статус:</p>
                <p>{this.props.status}</p>
            </div>
        );
    }
}
