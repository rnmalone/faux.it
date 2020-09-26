import React from 'react';
import cx from 'classnames';
import '../styles/Statistic.scss';
import Delta from "../../Delta/Delta";

export interface IStatistic {
    value: string;
    label: string;
    delta?: number;
    isPositive?: boolean;
    large?: boolean;
}

export default function Statistic({ value, label, delta, large, isPositive }: IStatistic) {
    return (
        <div className={cx('Statistic', { 'Statistic__large': large })}>
            <dt>{label}</dt>
            <div>
                <dd>{value}</dd>
                { delta && <Delta value={delta} isPositive={isPositive} />}
            </div>
        </div>
    )
}