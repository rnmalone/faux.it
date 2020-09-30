import React, {useRef, useState} from 'react';
import cx from 'classnames';
import './Dropdown.scss'
import {IFacet} from "../../../server/@types/Facet";
import {useOutsideClicks, useOverlay} from "../../lib/hooks";
import Icon, {IconType} from "../Icon/Icon";
import useQueryResultHydration from "../../lib/hooks/useQueryResultHydration";

interface IDropdownProps {
    filterKey: string;
    label: string;
    itemList: IFacet[],
    selectedList: string[],
    onSelect(filterKey: string, value: string): () => void
}

export default function Dropdown({filterKey, label, itemList = [], selectedList, onSelect}: IDropdownProps) {
    const dropdownItems = useQueryResultHydration(itemList)
    const dropdownRef = useRef(null)
    const {overlayOpen, openOverlay, closeOverlay} = useOverlay()
    useOutsideClicks(dropdownRef, closeOverlay)

    const getNote = () => {
        if (itemList.length === 1) return itemList[0].value
        if (!selectedList.length) return 'all'
        if (selectedList.length === 1) {
            const value = selectedList[0];
            if (value.length > 14) {
                return '1 selected';
            }

            return value
        }
        if(selectedList.length > 1) {
            return `${selectedList.length} selected`
        }
    }

    return (
        <div className="Dropdown">
            <span className="Dropdown__label">{label}</span>
            <div
                role="button"
                tabIndex={0}
                onClick={openOverlay}
                className={cx('Dropdown__widget', {'Dropdown__widget--open': overlayOpen})}
            >
                <div>
                    <p>{getNote()}</p>
                </div>
                <Icon type={IconType.Chevron}/>
            </div>
            {overlayOpen ? <div ref={dropdownRef} className={'Dropdown__overlay'}>
                {
                    dropdownItems.map((item: IFacet) => (
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
                        </div>
                    ))
                }
            </div> : null}
        </div>
    )
}
