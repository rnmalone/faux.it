import React from 'react';
import {Statistic} from "../../../../components/Statistic";
import '../../styles/Statistics.scss';
import employeeStatisticsQuery from '../../../../api/employeeStatistics.graphql';
import {useQuery} from "@apollo/client";
import {pc, price} from "../../../../lib/utils/formatters";
import {Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {colors, divisionColorsByString, saleStatusColorMap} from "../../../../config/color.config";
import SegmentControl from "../../../../components/SegmentControl";
import BarDistribution from 'client/components/BarDistribution';
import GenderInsights from "./GenderInsights";
import SmallStats from "./SmallStats";
import {useTimeframe} from "../../../../lib/hooks";
import RevenueGraph from "../../../../components/RevenueGraph";
import {
    IEmployeeStatisticsResponse,
    IProductCategoryProfit,
    ISaleSourceProfit,
    ISalesStatusPieSegment
} from "../../../../../@types";

interface IEmployeeStatistics {
    id: number;
    division: string;
}

export default function EmployeeStatistics({ id, division }: IEmployeeStatistics) {
    const { timeframe, toggleTimeframe, options: timeframeOptions } = useTimeframe()
    const { data, loading } = useQuery<IEmployeeStatisticsResponse, { timeframe: number, id: number }>(employeeStatisticsQuery, { variables: { id, timeframe } })

    return (
        <div className="Statistics">
            <SegmentControl
                segments={timeframeOptions}
                onClick={toggleTimeframe}
                selected={timeframe}
            />
            <SmallStats loading={loading} data={data?.employeeStatistics?.stats} />
            <section className="Statistics__row Statistics__revenue page-item">
                <div className="Statistics__revenue__left">
                        <Statistic
                            loading={loading}
                            label="Sales Revenue"
                            width="260"
                            height="60"
                            value={price(data?.employeeStatistics?.stats?.totalRevenue?.current)}
                            delta={data?.employeeStatistics?.stats?.totalRevenue?.delta}
                            isPositive={data?.employeeStatistics?.stats?.totalRevenue?.delta > 0}
                            large
                        />
                        <Statistic
                            loading={loading}
                            label="Gross Profit"
                            value={price(data?.employeeStatistics?.stats?.totalProfit?.current)}
                            delta={data?.employeeStatistics?.stats?.totalProfit?.delta}
                            isPositive={data?.employeeStatistics?.stats?.totalProfit?.delta > 0}

                        />
                        <Statistic
                            loading={loading}
                            label="Gross Profit Margin"
                            value={pc(data?.employeeStatistics?.stats?.grossProfitMargin?.current)}
                            delta={data?.employeeStatistics?.stats?.grossProfitMargin?.delta}
                            isPositive={data?.employeeStatistics?.stats?.grossProfitMargin?.delta > 0}

                        />
                </div>
                <div className="fill-remaining">
                    <RevenueGraph data={data?.employeeStatistics?.revenueGraph} />
                </div>
            </section>
            <section className="Statistics__flex-row">
                <div className="page-item">
                    <h6>Product Category Breakdown</h6>
                    {
                        data?.employeeStatistics.productCategoryProfit.map((stat: IProductCategoryProfit, i: number) => (
                            <BarDistribution
                                left={{
                                    pc: ( 100 / data.employeeStatistics.stats.totalProfit.current) * stat.profit,
                                    value: stat.profit,
                                    label: stat.productCategory,
                                    color: colors[`${divisionColorsByString[division]}${i + 1}`]
                                }}
                            />
                        ))
                    }
                </div>
                <div className="page-item">
                    <h6>Lead source profit contribution</h6>
                    {
                        data?.employeeStatistics.saleSourceProfit.map((stat: ISaleSourceProfit) => (
                            <BarDistribution
                                left={{
                                    pc: ( 100 / data.employeeStatistics.stats.totalProfit.current) * stat.profit,
                                    value: stat.profit,
                                    label: stat.leadSource
                                }}
                            />
                        ))
                    }
                </div>
                <GenderInsights
                    data={data?.employeeStatistics.saleCustomerStats}
                    totalProfit={data?.employeeStatistics?.stats?.totalProfit.current}
                    totalRevenue={data?.employeeStatistics?.stats?.totalRevenue.current}
                />
            </section>
            <section className="page-item">
                <h6>Sale Conversion</h6>
                <div className="Statistics__row">
                    <div className="Statistics__pie-container">
                        <span>{pc(data?.employeeStatistics?.stats?.saleConversionPc?.current)}</span>
                        <ResponsiveContainer width={250} height={250}>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={data?.employeeStatistics?.salesStatusPieChartData}
                                    cx={125}
                                    cy={126}
                                    outerRadius={120}
                                    innerRadius={105}
                                >
                                    {
                                        data?.employeeStatistics?.salesStatusPieChartData?.map((entry: ISalesStatusPieSegment, index: number) => <Cell key={`cell-${index}`} fill={saleStatusColorMap[entry.status]} />)
                                    }
                                </Pie>
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
                                <XAxis stroke={colors.lightGrey} dataKey="date" />
                                <Tooltip />
                                <Bar width={10} dataKey="completed" fill={colors.green} />
                                <Bar width={10} dataKey="closed" fill={colors.red} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
        </div>
    )
}