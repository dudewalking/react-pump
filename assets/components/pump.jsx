import React from "react";
import {ProgressBar, ButtonGroup} from "react-bootstrap";
import ReactBootstrapToggle from "react-bootstrap-toggle";
import {Algorithm} from "./algorithm.js";


export default class Pump extends React.Component {

    constructor() {
        super();
        this.state = {
            controllers: [
                {id: 1, name: "one", isOpen: false},
                {id: 2, name: "two", isOpen: false},
                {id: 3, name: "three", isOpen: false},
                {id: 4, name: "four", isOpen: false},
                {id: 5, name: "five", isOpen: false}
            ],
            isSafe: false,
            isCorrectOpen: false
        };
    }

    _calculate(controller) {

        let updatedControllers = [...this.state.controllers].map(function (ctr) {
            if (ctr.name === controller) {
                ctr.isOpen = !ctr.isOpen;
            }
            return ctr;
        });

        this.setState({controllers: updatedControllers}, function () {
            let isCorrectOpen = Algorithm.calculate(controller, this.state.controllers);
            let isSafe = Algorithm.isSafe;
            this.setState({isSafe: isSafe, isCorrectOpen: isCorrectOpen});
        });

    }

    render() {
        return (
            <div className="pump">
                <PumpControllers controllers={this.state.controllers}
                                 isSafe={this.state.isSafe}
                                 calculate={this._calculate.bind(this)}/>
                <Machine controllers={this.state.controllers}
                         isCorrectOpen={this.state.isCorrectOpen}/>
                <Status/>
                <Progress />
            </div>
        );
    }
}

class PumpControllers extends React.Component {

    _calculate(controller) {
        this.props.calculate(controller);
    }

    render() {
        const buttons = [...this.props.controllers].map(function (button) {
            return <Controller key={button.id} name={button.name}
                               isSafe={this.props.isSafe}
                               controllers={this.props.controllers}
                               calculate={this._calculate.bind(this)}/>;
        }, this);
        return (
            <ButtonGroup vertical>
                {buttons}
            </ButtonGroup>
        );
    }
}

class Controller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };
    }

    _calculate() {
        this.props.calculate(this.props.name);
        this.setState({
            isOpened: !this.state.isOpened,
        });
    }

    render() {
        return (
            <ReactBootstrapToggle
                disabled={this.props.isSafe}
                on={"OPENED"}
                off={"CLOSED"}
                active={this.state.isOpened}
                onChange={this._calculate.bind(this)}/>
        );
    }
}

class Machine extends React.Component {
    render() {
        return (
            <div className="center-side">
                <Markers controllers={this.props.controllers}
                         isCorrectOpen={this.props.isCorrectOpen}/>
                <img src="./assets/svg/final-pump.svg" width="500px" height="500px"/>
            </div>
        );
    }
}

class Status extends React.Component {
    render() {
        return (
            <div className="right-side">
                <p>Status:</p>
                <p>Log</p>
            </div>
        );
    }
}

class Progress extends React.Component {
    render() {
        const now = 60;
        return (
            <ProgressBar style={{height: 20, width: 600}} active striped now={now} label={`${now}%`}/>
        );
    }
}


class Markers extends React.Component {
    render() {

        const markers = [...this.props.controllers].map(function (marker) {
            return <Marker key={marker.id} name={marker.name} correct={this.props.isCorrectOpen}/>;
        }, this);

        return (
            <div>
                {markers}
            </div>
        );
    }
}


class Marker extends React.Component {

    render() {

        console.log(this.props.correct);

        let color = this.props.correct ? "state-safe" : "state-danger";

        return (
            <div className={"markers marker-" + this.props.name + " " + color}/>
        );
    }
}
