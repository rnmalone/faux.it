import React, {useRef, useState} from 'react';
import cx from 'classnames';
import './Dropdown.scss'
import {IFacet} from "../../../server/@types/Facet";
import {useOutsideClicks, useOverlay} from "../../lib/hooks";
import Icon, {IconType} from "../Icon/Icon";

interface IDropdownProps {
    filterKey: string;
    label: string;
    itemList: IFacet[],
    selectedList: string[],

    onSelect(filterKey: string, value: string): () => void
}

export default function Dropdown({filterKey, label, itemList = [], selectedList, onSelect}: IDropdownProps) {
    const dropdownRef = useRef(null)
    const {overlayOpen, openOverlay, closeOverlay} = useOverlay()
    useOutsideClicks(dropdownRef, closeOverlay)

    return (
        <div className="Dropdown">
            <div
                role="button"
                tabIndex={0}
                onClick={openOverlay}
                className={cx('Dropdown__widget', {'Dropdown__widget--open': overlayOpen})}
            >
                <div>
                    <p>{label}</p>
                    <span>Foo bar</span>
                </div>
                <Icon type={IconType.Chevron} />
            </div>
            {overlayOpen ? <div ref={dropdownRef} className={'Dropdown__overlay'}>
                {
                    itemList.map((item: IFacet) => (
                        <div
                            key={`${filterKey}-${item.value}`}
                            tabIndex={0}
                            role="button"
                            onClick={onSelect(filterKey, item.value)}
                            className={cx('Dropdown__item', {
                                'Dropdown__item--selected': selectedList.includes(item.value)
                            })}
                        >
                            <span>{item.value}</span>
                            <span>{item.count}</span>
                        </div>
                    ))
                }
            </div> : null }
        </div>
    )
}
