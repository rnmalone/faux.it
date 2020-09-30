import React from 'react';
import shortid from 'shortid';
import cx from 'classnames';
import {INavigationTools} from "./Navigation-Container";
import {NAVIGATION_ROUTES} from "../../../config/navigation";
import Icon from "../../Icon";

export default function DesktopOptions({onSelectRoute, selectedRoute}: INavigationTools) {
    return (
        <div className="Navigation__desktop__options">
            {
                NAVIGATION_ROUTES.map(({route, displayName, icon}) => (
                    <div
                        className={cx('Navigation__desktop__options__item', {
                            'Navigation__desktop__options__item--selected': selectedRoute === route
                        })}
                        key={shortid()}
                        role="button"
                        onClick={onSelectRoute(route)}
                    >
                        {displayName}
                        <Icon type={icon} />
                    </div>
                ))
            }
        </div>
    )
}
