import React from 'react';
import {Route, Switch, useLocation} from "react-router";
import SaleList from "./SaleList";
import EmployeeList from "./EmployeeList";
import Sale from "./Sale";
import Employee from "./Employee";
import {TransitionGroup, CSSTransition} from "react-transition-group";

export default () => {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="opacity"
                timeout={1000}
            >
                <Switch>
                    <Route exact path="/employees" component={EmployeeList}/>
                    <Route path="/sales" coponent={SaleList}/>
                    <Route path="/sale/:sale" component={Sale}/>
                    <Route path="/employee/:id" component={Employee}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}
