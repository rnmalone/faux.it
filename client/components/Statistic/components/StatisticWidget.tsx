import React from 'react';
import cx from 'classnames';
import Statistic, {IStatistic} from "./Statistic";
import {IconType} from "../../Icon/Icon";

import '../styles/StatisticWidget.scss'

interface IStatisticWidget extends IStatistic {
    borderColor?: string;
    icon?: IconType;
    showIcon?: boolean;
}

export default function StatisticWidget({ loading, borderColor, value, label, isPositive, height = "40", width = "160" }: IStatisticWidget) {

    return (
        <div className={cx('StatisticWidget page-item', {
            [`StatisticWidget--${borderColor}`]: true
        })}>
            <Statistic
                width={width}
                loading={loading}
                value={value}
                label={label}
                isPositive={isPositive}
            />
        </div>
    )
}