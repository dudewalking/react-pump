import React from "react";
import {DataCheck} from "./solution-2/replacement.js";
import {controllers} from "../data";
import Progress from "./progress.jsx";
import PumpControllers from "./pump-controllers.jsx";
import Machine from "./machine.jsx";
import Status from "./status.jsx";
import ControllersTable from "./controllers-table.jsx";


export default class Pump extends React.Component {

    constructor() {
        super();
        this.state = {
            controllers: controllers,
            isSafe: false,
            isAllowed: true,
            status: "Не активен"
        };
    }

    _updateStatus() {
        this.setState({status: "Заполнение завершилось!"});
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
                    ctr.isCorrectText = "БЕЗОПАСНО";
                    updatedStatus = `Контроллер №${ctr.id} открыт`;
                }
                else if (isOpened && !result.markerColor) {
                    ctr.markerColor = "state-danger";
                    ctr.isCorrectOpen = false;
                    ctr.isCorrectText = "ОПАСНО";
                    updatedStatus = `Контроллер №${ctr.id} должен быть закрыт!`;
                }
                else {
                    ctr.markerColor = "state-def";
                    ctr.isCorrectOpen = true;
                    ctr.isOpenText = "ВЫКЛ.";
                    ctr.isCorrectText = "НЕ АКТИВНО";
                    updatedStatus = `Контроллер №${ctr.id} закрыт`;
                }
            }
            return ctr;
        });

        if (controller.id === 1 && isOpened && result.markerColor) {
            updatedStatus = "Заполнение началось!";
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
                <PumpControllers isSafe={this.state.isSafe}
                                 controllers={this.state.controllers}
                                 compare={this._compare.bind(this)}/>

                <Machine isSafe={this.state.isSafe}
                         controllers={this.state.controllers}/>

                <Status status={this.state.status}/>
                <Progress isSafe={this.state.isSafe}
                          updateStatus={() => this._updateStatus()}/>

                <ControllersTable controllers={this.state.controllers}/>
            </div>
        );
    }
}
