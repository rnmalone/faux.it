import React from 'react';
import {Pie, PieChart, ResponsiveContainer} from "recharts";
import {price} from "../../lib/utils/formatters";

const RADIAN = Math.PI / 180;

export default function LabelledPieChart({ data, children, dataKey }) {
    const CustomLabel = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, outerRadius, fill, payload, label
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{label}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {price(props[dataKey])}
                </text>
            </g>
        );
    }


    return (
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <PieChart>
                <Pie
                    data={data}
                     cx={'50%'}
                     cy={'50%'}
                     outerRadius={'70%'}
                     innerRadius={'58%'}
                     dataKey={dataKey}
                     label={CustomLabel}
                >
                    {children}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}