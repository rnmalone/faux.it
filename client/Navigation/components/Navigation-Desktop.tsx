import React from 'react';
import shortid from 'shortid';
import cx from 'classnames';
import {INavigationTools} from "./Navigation-Container";
import {NAVIGATION_ROUTES} from "../../config/navigation";

export default function DesktopOptions({ onSelectRoute, selectedRoute }: INavigationTools) {
    console.log(selectedRoute)
    return (
        <div className="Navigation__desktop__options">
            {
                NAVIGATION_ROUTES.map(({ route, displayName }) => (
                    <div
                        className={cx('Navigation__desktop__options__item', {
                            'Navigation__desktop__options__item--selected': selectedRoute === route
                        })}
                        key={shortid()}
                        role="button"
                        onClick={onSelectRoute(route)}
                    >
                        {displayName}
                    </div>
                ))
            }
        </div>
    )
}
