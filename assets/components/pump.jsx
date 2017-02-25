import React from "react";
import {checkAndReplace} from "./solution-2/replacement.js";
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
            isFull: false,
            isAllowed: true,
            isAbleToDrain: false,
            status: "Не активен",
            progress: 0,
        };
    }

    componentDidUpdate() {
        if (this.state.isSafe) {
            this._runProgress();
        }
    }

    _updateStatus(status) {
        this.setState({status: status});
    }

    _ableToDrain() {
        let updatedControllers = [...this.state.controllers].map((ctr) => {
            if (ctr.id === 3) {
                ctr.markerColor = "state-safe";
                ctr.isOpen = true;
                ctr.isCorrectOpen = true;
                ctr.isOpenText = "ВКЛ.";
                ctr.isCorrectText = "БЕЗОПАСНО";
            } else {
                ctr.markerColor = "state-def";
                ctr.isOpen = false;
                ctr.isCorrectOpen = true;
                ctr.isOpenText = "ВЫКЛ.";
                ctr.isCorrectText = "НЕ АКТИВНО";
            }
            return ctr;
        });

        this.setState({
            isAbleToDrain: true,
            isSafe: false,
            progress: 0,
            controllers: updatedControllers,
        });

        setTimeout(() => {
            let updatedControllers2 = [...this.state.controllers].map((ctr) => {
                if (ctr.id === 3) {
                    ctr.markerColor = "state-def";
                    ctr.isOpen = false;
                    ctr.isCorrectOpen = true;
                    ctr.isOpenText = "ВЫКЛ.";
                    ctr.isCorrectText = "НЕ АКТИВНО";
                }
                return ctr;
            });
            this.setState({isFull: false, isAbleToDrain: false, controllers: updatedControllers2});
            this._updateStatus("Слив Завершен!");
        }, 4000);
    }

    _runProgress() {
        if (this.state.isSafe) {
            if (this.state.progress < 100) {
                setTimeout((() => {
                    this.setState({progress: this.state.progress + 1});
                }), 100);
            } else {
                clearTimeout();
                this.setState({isSafe: false, isFull: true});
                setTimeout(() => this._updateStatus("Заполнение завершилось!"), 100);
            }
        }
    }

    _compare(controller) {
        let updatedStatus = "";
        let updatedControllers = [...this.state.controllers].map((ctr) => {
            if (ctr.name === controller.name) {
                ctr.isOpen = !ctr.isOpen;
            }
            ctr.isOpen = +ctr.isOpen;
            return ctr.isOpen;
        });

        let result = checkAndReplace.check(updatedControllers.join(""));

        let updatedControllers2 = [...this.state.controllers].map((ctr) => {
            if (ctr.id === controller.id) {
                if (ctr.isOpen && result.markerColor) {
                    ctr.markerColor = "state-safe";
                    ctr.isCorrectOpen = true;
                    ctr.isOpenText = "ВКЛ.";
                    ctr.isCorrectText = "БЕЗОПАСНО";
                    updatedStatus = `Контроллер №${ctr.id} открыт`;
                }
                else if (ctr.isOpen && !result.markerColor) {
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

        if (controller.id === 1 && controller.isOpen && result.markerColor) {
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
                                 isFull={this.state.isFull}
                                 isAbleToDrain={this.state.isAbleToDrain}
                                 controllers={this.state.controllers}
                                 compare={(controller, isOpened) => this._compare(controller, isOpened)}/>

                <Machine isSafe={this.state.isSafe}
                         isFull={this.state.isFull}
                         isAbleToDrain={this.state.isAbleToDrain}
                         controllers={this.state.controllers}/>

                <Status status={this.state.status}
                        ableToDrain={() => this._ableToDrain()}
                        updateStatus={(status) => this._updateStatus(status)}/>

                <Progress isSafe={this.state.isSafe}
                          isAbleToDrain={this.state.isAbleToDrain}
                          progress={this.state.progress}
                          updateStatus={(status) => this._updateStatus(status)}/>

                <ControllersTable controllers={this.state.controllers}/>
            </div>
        );
    }
}
