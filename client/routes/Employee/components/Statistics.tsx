import React from 'react';
import Statistic from "../../../components/Statistic";
import '../styles/Statistics.scss';

import employeeStatisticsQuery from '../../../api/employeeStatistics.graphql';
import {useQuery} from "@apollo/client";
import {formatNumber, price} from "../../../lib/utils";
import {
    LineChart, Line, XAxis, YAxis, PieChart, Tooltip, Pie, ResponsiveContainer, Bar, BarChart
} from 'recharts';
export default function Statistics({ id }) {
    const { data } = useQuery(employeeStatisticsQuery, { variables: { id, timeframe: 3 } })

    return (
        <div className="Statistics">
            <section className="Statistics__row">
                <div className="page-item">
                    <Statistic
                        label="Sales Revenue"
                        value={price(data?.employeeStatistics?.stats?.totalRevenue?.current)}
                        delta={data?.employeeStatistics?.stats?.totalRevenue?.delta}
                        isPositive={data?.employeeStatistics?.stats?.totalRevenue?.delta > 0}
                        large
                    />
                        <Statistic
                            label="Gross Profit"
                            value={price(data?.employeeStatistics?.stats?.totalProfit?.current)}
                            delta={data?.employeeStatistics?.stats?.totalProfit?.delta}
                            isPositive={data?.employeeStatistics?.stats?.totalProfit?.delta > 0}

                        />
                        <Statistic
                            label="Gross Profit Margin"
                            value={0}
                        />
                    <Statistic
                        label="Commission Earnings"
                        value={price(data?.employeeStatistics?.stats?.commissionEarnings?.current)}
                        delta={data?.employeeStatistics?.stats?.commissionEarnings?.delta}
                        isPositive={data?.employeeStatistics?.stats?.commissionEarnings?.delta > 0}
                    />
                </div>
                <div className="fill-remaining">
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <LineChart
                            data={data?.employeeStatistics?.profitGraph}
                            margin={{
                                top: 16, left: 40, bottom: 16,
                            }}
                        >
                            <XAxis dataKey="date" />
                            <YAxis tickFormatter={price} tickSize={10} />
                            <Tooltip />
                            <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
            <section className="Statistics__row page-item">
                <div className="Statistics__pie-container">
                    <span>{data?.employeeStatistics?.stats?.saleConversionPc?.current}</span>
                    <ResponsiveContainer width={250} height={250}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={data?.employeeStatistics?.salesStatusPieChartData}
                                cx={125}
                                cy={126}
                                outerRadius={120}
                                innerRadius={105}
                                fill="#8884d8"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="fill-remaining">
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <BarChart
                            data={data?.employeeStatistics?.saleStatusGraph}
                            margin={{
                                top: 16, right: 16, left: 40, bottom: 16,
                            }}
                        >
                            <XAxis dataKey="date" />
                            <Tooltip />
                            <Bar width={10} dataKey="completed" fill="#8884d8" />
                            <Bar width={10} dataKey="closed" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

        </div>
    )
}