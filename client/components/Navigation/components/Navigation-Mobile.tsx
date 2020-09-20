import React, {useRef, useState} from 'react';
import {INavigationTools} from "./Navigation-Container";
import {CSSTransition} from "react-transition-group";
import {NAVIGATION_ROUTES} from "../../../config/navigation";
import cx from "classnames";
import shortid from "shortid";
import {useOutsideClicks} from "../../../lib/hooks";

export default function MobileOptions({onSelectRoute, selectedRoute}: INavigationTools) {
    const ref = useRef(null)
    const [open, setOpen] = useState<boolean>(false);
    const closeOptions = () => void setOpen(false);
    const openOptions = () => void setOpen(true);
    useOutsideClicks(ref, closeOptions)

    return (
        <div>
            <div
                className={cx('Navigation__mobile__menu-button', {
                    'Navigation__mobile__menu-button__blocked': open
                })}
                role="button"
                onClick={openOptions}
            >
                X
            </div>
            <CSSTransition
                in={open}
                timeout={300}
                classNames="slide-in"
                unmountOnExit
            >
                <div ref={ref} className="Navigation__mobile__options-popover">
                    {
                        NAVIGATION_ROUTES.map(({route, displayName}) => (
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
            </CSSTransition>
        </div>
    )
}
