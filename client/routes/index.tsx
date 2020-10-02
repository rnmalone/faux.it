import React from 'react';
import {Route, Switch, useLocation} from "react-router";
import EmployeeList from "./EmployeeList";
import Employee from "./Employee";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import SalesOverview from "./SalesOverview";

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
                    <Route exact path="/" component={() => null} />
                    <Route path="/employees" component={EmployeeList}/>
                    <Route path="/employee/:id" component={Employee}/>
                    <Route path="/sales" component={SalesOverview} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}
