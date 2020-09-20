import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {useHistory, useLocation, useRouteMatch} from "react-router";
import Title from "../../Title";
import {INavigationRoute, NAVIGATION_ROUTES} from "../../../config/navigation";
import DesktopOptions from "./Navigation-Desktop";
import MobileOptions from "./Navigation-Mobile";

import '../styles/Navigation.scss';

export interface INavigationTools {
    onSelectRoute(route: string): () => void,

    selectedRoute: INavigationRoute["route"]
}


export default function NavigationContainer({isMobile}: { isMobile: boolean }) {
    const [selectedRoute, setSelectedRoute] = useState<INavigationRoute["route"] | undefined>()
    const location = useLocation()
    const history = useHistory();

    useEffect(() => {
        const activeRoute = NAVIGATION_ROUTES.find(({route}) => location.pathname.includes(route))

        if (activeRoute) setSelectedRoute(activeRoute.route);
    }, [location.pathname])

    const menuProps = {
        onSelectRoute: (route: string) => () => {
            history.push(route)
        },
        selectedRoute
    }

    return (
        <div className={cx('Navigation', {
            'Navigation__desktop': !isMobile,
            'Navigation__mobile': isMobile
        })}>
            <div>
                <header>
                    <Title/>
                </header>
                {
                    isMobile ? <MobileOptions {...menuProps} /> : <DesktopOptions {...menuProps} />
                }
            </div>
        </div>
    )
}
