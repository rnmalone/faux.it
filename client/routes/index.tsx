import React from 'react';
import {Route, Switch} from "react-router";
import SaleList from "./SaleList";
import EmployeeList from "./EmployeeList";
import Sale from "./Sale";
import Employee from "./Employee";

export default () => {
    return (
        <Switch>
            <Route path="/sales" coponent={SaleList}/>
            <Route path="/employees" components={EmployeeList} />
            <Route path="/sale/:sale" components={Sale} />
            <Route path="/employee/:employee" components={Employee} />
        </Switch>
    )
}
