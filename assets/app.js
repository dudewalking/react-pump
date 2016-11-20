"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import Main from "./components/main.jsx";
import Pump from "./components/pump.jsx";

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}/>
        <Route path="/pump" component={Pump}/>
    </Router>
), document.getElementById("app"));