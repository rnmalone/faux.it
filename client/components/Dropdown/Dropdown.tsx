import React, {useState} from 'react';
import cx from 'classnames';
import './Dropdown.scss'
import {IFacet} from "../../../server/@types/Facet";

export default function Dropdown({ label, itemList = [], selectedList, onSelect }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="Dropdown">
            <div className="Dropdown__widget">
                {label}
            </div>
            <div className="Dropdown__overlay">
                <ul>
                    {
                        itemList.map((item: IFacet) => (
                            <li
                                key={`${label}-${item.value}`}
                                tabIndex={0}
                                role="button"
                                onClick={onSelect(label, item.value)}
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
