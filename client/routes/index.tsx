import React from 'react';
import {Route, Switch} from "react-router";
import SaleList from "./SaleList";
import EmployeeList from "./EmployeeList";
import Sale from "./Sale";
import Employee from "./Employee";

export default () => {
    return (
        <Switch>
            <Route exact path="/employees" component={EmployeeList}/>
            <Route path="/sales" coponent={SaleList}/>
            <Route path="/sale/:sale" component={Sale}/>
            <Route path="/employee/:employee" component={Employee}/>
        </Switch>
    )
}
