import React from "react";
import {Button} from "react-bootstrap";

export default class Status extends React.Component {

    _ableToDrain() {
        this.props.ableToDrain();
    }

    _updateStatus(status) {
        this.props.updateStatus(status);
    }

    render() {
        return (
            <div className="right-side">
                <p>Статус:</p>
                <p>{this.props.status}</p>

                {this.props.status === "Заполнение завершилось!"
                    ? <Button onClick={() => {
                        this._ableToDrain();
                        this._updateStatus("Слив запущен!");
                    }}>Запустить Слив</Button>
                    : null
                }
            </div>
        );
    }
}
