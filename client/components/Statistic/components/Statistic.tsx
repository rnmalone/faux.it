import React from 'react';
import cx from 'classnames';
import '../styles/Statistic.scss';
import Delta from "../../Delta/Delta";
import TextPlaceholder from "../../TextPlaceholder";

export interface IStatistic {
    value: string;
    label: string;
    delta?: number;
    isPositive?: boolean;
    large?: boolean;
    loading: boolean;
    className?: string;
    height?: string;
    width?: string;
}

export default function Statistic({
                                      width = "160",
                                      height = "40",
                                      loading,
                                      className,
                                      value,
                                      label,
                                      delta,
                                      large,
                                      isPositive
                                  }: IStatistic) {
    return (
        <div className={cx(`Statistic ${className}`, {'Statistic__large': large})}>
            <dt>{label}</dt>
            <TextPlaceholder loading={loading} height={height} width={width}>
                <div className="Statistic__contents">
                    <dd>{value}</dd>
                    {delta && <Delta value={delta} isPositive={!!isPositive}/>}
                </div>
            </TextPlaceholder>
        </div>
    )
}