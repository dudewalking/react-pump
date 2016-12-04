import React from "react";
import {ProgressBar, ButtonGroup} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ReactBootstrapToggle from "react-bootstrap-toggle";
import {Algorithm} from "./algorithm.js";
import {DataCheck} from "./replacement.js";


export default class Pump extends React.Component {

	constructor() {
		super();
		this.state = {
			controllers: [
                {id: 1, name: "one", isOpen: false, isCorrectOpen: false, markerColor: "state-def"},
                {id: 2, name: "two", isOpen: false, isCorrectOpen: false, markerColor: "state-def"},
                {id: 3, name: "three", isOpen: false, isCorrectOpen: false, markerColor: "state-def"},
                {id: 4, name: "four", isOpen: false, isCorrectOpen: false, markerColor: "state-def"},
                {id: 5, name: "five", isOpen: false, isCorrectOpen: false, markerColor: "state-def"}
			],
			isSafe: false,
			isAllowed: true,
			status: Algorithm.status
		};
	}


	_compare(controller, isOpened) {
		let updatedControllers = [...this.state.controllers].map(function (ctr) {
			if (ctr.name === controller) {
				ctr.isOpen = !ctr.isOpen;
			}
			ctr.isOpen = +ctr.isOpen;
			return ctr.isOpen;
		});

		let result = DataCheck.check(updatedControllers.join(""));

        console.log(updatedControllers);
        console.log(result);

        let updatedControllers2 = [...this.state.controllers].map(function (ctr) {
			if (ctr.name === controller) {
				if (isOpened && result.markerColor) {
					ctr.markerColor = "state-safe";
				}
				else if (isOpened && !result.markerColor) {
					ctr.markerColor = "state-danger";
				} else {
					ctr.markerColor = "state-def";
				}
			}
			return ctr;
		});

		this.setState({
			isAllowed: result.objState,
			controllers: updatedControllers2
		});
	}

    // _calculate(controller, isOpened) {
    //
    // 	let updatedControllers = [...this.state.controllers].map(function (ctr) {
    // 		if (ctr.name === controller) {
    // 			ctr.isOpen = !ctr.isOpen;
    // 		}
    // 		return ctr;
    // 	});
    //
    // 	this.setState({controllers: updatedControllers}, function () {
    // 		Algorithm.calculate(controller, this.state.controllers, isOpened);
    // 		let isCorrectOpen = Algorithm.isCorrectOpen;
    // 		let isSafe = Algorithm.isSafe;
    // 		let status = Algorithm.status;
    // 		let markerColor = Algorithm.markerColor;
    //
    // 		this.setState({isSafe: isSafe, status: status}, function () {
    // 			let updControllers = [...this.state.controllers].map(function (ctr) {
    // 				if (ctr.name === controller) {
    // 					ctr.isCorrectOpen = isCorrectOpen;
    // 					ctr.markerColor = markerColor;
    // 				}
    // 				return ctr;
    // 			});
    // 			this.setState({controllers: updControllers});
    // 		});
    // 	});
    //
    // }

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

    // _calculate(controller, isOpened) {
    // 	this.props.calculate(controller, isOpened);
    // }

	_compare(controller, isOpened) {
		this.props.compare(controller, isOpened);
	}

	render() {
		const buttons = [...this.props.controllers].map(function (button) {
			return (
                <Controller key={button.id} name={button.name}
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
			this.props.compare(this.props.name, this.state.isOpened);
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
                <TableHeaderColumn dataField='isOpen'>On/Off</TableHeaderColumn>
                <TableHeaderColumn dataField='isCorrectOpen'>Controller State</TableHeaderColumn>
            </BootstrapTable>
		);
	}
}