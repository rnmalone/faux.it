import React, {useRef, useState} from 'react';
import cx from 'classnames';
import './Dropdown.scss'
import {IFacet} from "../../../server/@types/Facet";
import {useOutsideClicks, useOverlay} from "../../lib/hooks";

interface IDropdownProps {
    filterKey: string;
    label: string;
    itemList: IFacet[],
    selectedList: string[],
    onSelect(filterKey: string, value: string): () => void
}

export default function Dropdown({ filterKey, label, itemList = [], selectedList, onSelect }: IDropdownProps) {
    const dropdownRef = useRef(null)
    const { overlayOpen, openOverlay, closeOverlay } = useOverlay()
    useOutsideClicks(dropdownRef, closeOverlay)

    return (
        <div className="Dropdown">
            <div className={cx('Dropdown__widget', { 'Dropdown__widget--open': overlayOpen })}>
                {label}
            </div>
            <div ref={dropdownRef} className="Dropdown__overlay">
                <ul>
                    {
                        itemList.map((item: IFacet) => (
                            <li
                                key={`${filterKey}-${item.value}`}
                                tabIndex={0}
                                role="button"
                                onClick={onSelect(filterKey, item.value)}
                                className={cx('Dropdown__item', {
                                    'Dropdown__item--selected': selectedList.includes(item.value)
                                })}
                            >
                                {item.value}
                                {item.count}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
