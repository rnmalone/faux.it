import React from 'react';
import cx from 'classnames';
import './Delta.scss';
import Icon from "../Icon";
import {IconType} from "../Icon/Icon";

export default function Delta({ value, isPositive }) {
    console.log(isPositive)
    return (
        <div className="Delta">
            <div className={cx('Delta__icon', {
                'Delta__icon--positive': isPositive,
                'Delta__icon--up': value > 0
            })}>
                <Icon type={IconType.ArrowRight} />
            </div>
            {value}
        </div>
    )
}