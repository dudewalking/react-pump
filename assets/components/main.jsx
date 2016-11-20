import React from "react";
import {Link} from "react-router";

export default class Main extends React.Component {
    render() {
        return (
            <div className="main-menu">
                <h1>Welcome to the Pump!</h1>
                <p className="phrase">Here you can fill in the pool</p>
                <Link to="/pump">
                    <button className="btn btn-primary btn-large">Pump</button>
                </Link>
            </div>
        );
    }
}