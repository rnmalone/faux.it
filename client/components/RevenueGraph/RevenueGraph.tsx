import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {colors} from "../../config/color.config";
import {price} from "../../lib/utils/formatters";

export default function RevenueGraph({ data }) {

    return (
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart
                data={data}
                margin={{
                    top: 5, left: 16, bottom: 0,
                }}
            >
                <XAxis stroke={colors.lightGrey} dataKey="date" tickLine={false} />
                <YAxis tickCount={2} stroke={colors.lightGrey} tickFormatter={price} tickSize={10} tickLine={false} />
                <Tooltip />
                <Line
                    dot={false}
                    strokeWidth={3}
                    type="monotone"
                    dataKey="revenue"
                    stroke={colors.primary}
                    fillOpacity={1}
                    fill={colors.primary}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}