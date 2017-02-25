import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

export default class ControllersTable extends React.Component {
    render() {
        return (
            <BootstrapTable data={this.props.controllers} striped hover>
                <TableHeaderColumn dataAlign="center" isKey dataField='id'>Идентификатор</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField='name'>Имя контроллера</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField='isOpenText'>Вкл/Выкл</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField='isCorrectText'>Состояние контроллера</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}