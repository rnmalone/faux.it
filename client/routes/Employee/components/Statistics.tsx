import React, {useState} from 'react';
import {Statistic, StatisticWidget} from "../../../components/Statistic";
import '../styles/Statistics.scss';
import employeeStatisticsQuery from '../../../api/employeeStatistics.graphql';
import {useQuery} from "@apollo/client";
import {formatNumber, price, rank} from "../../../lib/utils/formatters";
import {
    LineChart, Line, XAxis, YAxis, PieChart, Tooltip, Pie, ResponsiveContainer, Bar, BarChart
} from 'recharts';
import {rankColorMap} from "../../../config/color.config";
import {Timeframe} from "../../../../server/@types/Stats/Timeframe";
import SegmentControl from "../../../components/SegmentControl";


export default function Statistics({ id }) {
    const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Quarter)
    const { data } = useQuery(employeeStatisticsQuery, { variables: { id, timeframe } })
    const toggleSegment = (segment: Timeframe) => () => setTimeframe(segment)


    return (
        <div className="Statistics">
            <SegmentControl
                segments={[
                    {
                        key: Timeframe.Week,
                        value: 'Week'
                    },
                    {
                        key: Timeframe.Month,
                        value: 'Month'
                    },
                    {
                        key: Timeframe.Quarter,
                        value: 'Quarter'
                    },
                    {
                        key: Timeframe.Half,
                        value: '6 Months'
                    },
                    {
                        key: Timeframe.Year,
                        value: 'Year'
                    }
                ]}
                onClick={toggleSegment}
                selected={timeframe}
            />
            <section className="Statistics__small-stats">
                <StatisticWidget
                    label={"Division Sales Rank"}
                    value={rank(data?.employeeStatistics?.stats?.employeeDivisionSalesRank?.current)}
                    delta={data?.employeeStatistics?.stats?.employeeDivisionSalesRank?.delta}
                    borderColor={rankColorMap[data?.employeeStatistics?.stats?.employeeDivisionSalesRank?.current]}
                />
                <StatisticWidget
                    label={"Division Profit Rank"}
                    value={rank(data?.employeeStatistics?.stats?.employeeDivisionProfitRank?.current)}
                    delta={data?.employeeStatistics?.stats?.employeeDivisionProfitRank?.delta}
                    borderColor={rankColorMap[data?.employeeStatistics?.stats?.employeeDivisionProfitRank?.current]}
                />
                <StatisticWidget
                    label="Commission Earnings"
                    value={price(data?.employeeStatistics?.stats?.commissionEarnings?.current)}
                    delta={data?.employeeStatistics?.stats?.commissionEarnings?.delta}
                    isPositive={data?.employeeStatistics?.stats?.commissionEarnings?.delta > 0}
                />
                <StatisticWidget
                    label="Average Sale Profit"
                    value={price(data?.employeeStatistics?.stats?.averageProfit?.current)}
                    delta={data?.employeeStatistics?.stats?.averageProfit?.delta}
                    isPositive={data?.employeeStatistics?.stats?.averageProfit?.delta > 0}
                />
            </section>
            <section className="Statistics__row page-item">
                <div className="">
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