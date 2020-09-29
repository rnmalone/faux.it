import React from 'react';

import './BarDistribution.scss';
import {pc} from "../../lib/utils/formatters";

interface IBarDistributionSegment {
   pc: number;
   label: string;
   value: number;
   color?: string;
}

interface IBarDistribution {
    left: IBarDistributionSegment,
    right?: IBarDistributionSegment
}

export default function BarDistribution({ left, right }: IBarDistribution) {

    console.log(left.color)

    return (
        <div className="BarDistribution">
            <div className="BarDistribution__labels">
                <span>{`${left.label} - ${pc(Math.round(left.pc))}`}</span>
                { right ? <span>{`${pc(Math.round(right.pc))} - ${right.label}`}</span> : null}
            </div>
            <div className="BarDistribution__bar">
                <span
                    style={{
                        width: `${left.pc}%`,
                        backgroundColor: `${left.color}`
                    }}
                    className="BarDistribution__bar__segment" />
                { right ?
                    <span
                        style={{
                            width: `${right.pc}%`,
                            left: `${left.pc}%`,
                            backgroundColor: `${right.color}`
                        }}
                        className="BarDistribution__bar__segment"
                    /> : null }
            </div>
        </div>
    )
}