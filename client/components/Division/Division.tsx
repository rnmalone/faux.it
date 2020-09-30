import React from 'react';
import cx from 'classnames';
import {Division as DivisionType} from "../../../server/@types/Division";

import './Division.scss';


export default function Division({ type }: { type: DivisionType }) {

    return (
        <span className={cx('Division', {
            'Division--red': type === DivisionType.Aerospace,
            'Division--purple': type === DivisionType.Motor,
            'Division--blue': type === DivisionType.Nautical,
            'Division--yellow': type === DivisionType.Watches,
            'Division--brown': type === DivisionType.BakedGoods,
            'Division--green': type === DivisionType.Electrical,
        })}>
            <span>
                {type as string}
            </span>
        </span>
    )
}