import React from "react";
import {Button} from "react-bootstrap";

export default class Status extends React.Component {

    _ableToDrain(){
        this.props.ableToDrain();
    }

    render() {
        return (
            <div className="right-side">
                <p>Статус:</p>
                <p>{this.props.status}</p>

                {this.props.status === "Заполнение завершилось!"
                    ? <Button onClick={() => this._ableToDrain()}>Запустить Слив</Button>
                    : null
                }
            </div>
        );
    }
}
