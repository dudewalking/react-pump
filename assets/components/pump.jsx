import React from "react";
import {ProgressBar, ButtonGroup} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ReactBootstrapToggle from "react-bootstrap-toggle";
import {DataCheck} from "./simple/replacement.js";


export default class Pump extends React.Component {
    constructor() {
        super();
        this.state = {
            controllers: [
                {
                    id: 1,
                    name: "one",
                    isOpen: false,
                    isCorrectOpen: true,
                    isOpenText: "ВЫКЛ.",
                    isCorrectText: "НЕ АКТИВНО",
                    markerColor: "state-def"
                },
                {
                    id: 2,
                    name: "two",
                    isOpen: false,
                    isCorrectOpen: true,
                    isOpenText: "ВЫКЛ",
                    isCorrectText: "НЕ АКТИВНО",
                    markerColor: "state-def"
                },
                {
                    id: 3,
                    name: "three",
                    isOpen: false,
                    isCorrectOpen: true,
                    isOpenText: "ВЫКЛ",
                    isCorrectText: "НЕ АКТИВНО",
                    markerColor: "state-def"
                },
                {
                    id: 4,
                    name: "four",
                    isOpen: false,
                    isCorrectOpen: true,
                    isOpenText: "ВЫКЛ",
                    isCorrectText: "НЕ АКТИВНО",
                    markerColor: "state-def"
                },
                {
                    id: 5,
                    name: "five",
                    isOpen: false,
                    isCorrectOpen: true,
                    isOpenText: "ВЫКЛ",
                    isCorrectText: "НЕ АКТИВНО",
                    markerColor: "state-def"
                }
            ],
            isSafe: false,
            isAllowed: true,
            status: "Not active"
        };
    }


    _compare(controller, isOpened) {

        let updatedStatus = "";

        let updatedControllers = [...this.state.controllers].map(function (ctr) {
            if (ctr.name === controller.name) {
                ctr.isOpen = !ctr.isOpen;
            }
            ctr.isOpen = +ctr.isOpen;
            return ctr.isOpen;
        });

        let result = DataCheck.check(updatedControllers.join(""));


        let updatedControllers2 = [...this.state.controllers].map(function (ctr) {
            if (ctr.id === controller.id) {
                if (isOpened && result.markerColor) {
                    ctr.markerColor = "state-safe";
                    ctr.isCorrectOpen = true;
                    ctr.isOpenText = "ВКЛ.";
                    ctr.isCorrectText = "БЕЗОПАСНО!";
                    updatedStatus = `Controller №${ctr.id} is open`;
                }
                else if (isOpened && !result.markerColor) {
                    ctr.markerColor = "state-danger";
                    ctr.isCorrectOpen = false;
                    ctr.isCorrectText = "ОПАСНО!";
                    updatedStatus = `Controller №${ctr.id} must be closed!`;
                }
                else {
                    ctr.markerColor = "state-def";
                    ctr.isCorrectOpen = true;
                    ctr.isOpenText = "ВЫКЛ.";
                    ctr.isCorrectText = "НЕ АКТИВНО";
                    updatedStatus = `Controller №${ctr.id} is closed`;
                }
            }
            return ctr;
        });

        if (controller.id === 1 && isOpened && result.markerColor) {
            updatedStatus = "The filling has begun!";
            this.setState({isSafe: true});
        }

        this.setState({
            isAllowed: result.objState,
            controllers: updatedControllers2,
            status: updatedStatus
        });
    }

    render() {
        return (
            <div className="pump">
                <PumpControllers controllers={this.state.controllers}
                                 isSafe={this.state.isSafe}
                                 compare={this._compare.bind(this)}/>

                <Machine controllers={this.state.controllers} isSafe={this.state.isSafe}/>
                <Status status={this.state.status}/>
                <Progress isSafe={this.state.isSafe}/>
                <ControllersTable controllers={this.state.controllers}/>
            </div>
        );
    }
}

class PumpControllers extends React.Component {

    _compare(controller, isOpened) {
        this.props.compare(controller, isOpened);
    }

    render() {
        const buttons = [...this.props.controllers].map(function (controller) {
            return (
                <Controller key={controller.id} controller={controller}
                            isSafe={this.props.isSafe}
                            controllers={this.props.controllers}
                            compare={this._compare.bind(this)}/>
            );
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
        this.setState({isOpened: !this.state.isOpened,}, () => {
            this.props.compare(this.props.controller, this.state.isOpened);
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
                <Markers controllers={this.props.controllers}/>
                <div className={this.props.isSafe ? "water" : ""}/>
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
                <p>{this.props.status}</p>
            </div>
        );
    }
}

class Progress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    render() {
        return (
            <ProgressBar style={{height: 20, width: 600}} max={100} min={0} active striped now={this.state.progress}
                         label={`${this.state.progress}%`}/>
        );
    }
}


class Markers extends React.Component {
    render() {
        const markers = [...this.props.controllers].map(function (marker) {
            return <Marker key={marker.id} name={marker.name} markerColor={marker.markerColor}/>;
        });
        return (
            <div>
                {markers}
            </div>
        );
    }
}


class Marker extends React.Component {
    render() {
        return (
            <div className={"markers marker-" + this.props.name + " " + this.props.markerColor}/>
        );
    }
}


class ControllersTable extends React.Component {
    render() {
        return (
            <BootstrapTable data={this.props.controllers} striped hover>
                <TableHeaderColumn isKey dataField='id'>Controller ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Controller Name</TableHeaderColumn>
                <TableHeaderColumn dataField='isOpenText'>On/Off</TableHeaderColumn>
                <TableHeaderColumn dataField='isCorrectText'>Controller State</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}