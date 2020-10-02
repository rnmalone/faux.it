import React from 'react';
import salesOverviewStatisticsQuery from '../../../api/salesOverviewStatistics.graphql';
import '../styles/SalesOverview.scss'
import {useQuery} from "@apollo/client";
import {useTimeframe} from "../../../lib/hooks";
import {Statistic} from "../../../components/Statistic";
import {price} from "../../../lib/utils/formatters";
import RevenueGraph from "../../../components/RevenueGraph";
import LabelledPieChart from 'client/components/Piechart';
import {Cell} from "recharts";
import {colors, divisionHexColorMap, divisionHexColorMapLighten} from "../../../config/color.config";
import SegmentControl from "../../../components/SegmentControl";
import {ISalesOverviewStatisticsResponse} from "../../../../@types";

export default function SalesOverview() {
    const {timeframe, toggleTimeframe, options} = useTimeframe()
    const {data, loading} = useQuery<ISalesOverviewStatisticsResponse, { timeframe: number }>(salesOverviewStatisticsQuery, {variables: {timeframe}})

    return (
        <div className="SalesOverview">
            <div className="SalesOverview__upper">
                <div className="SalesOverview__upper__inner">
                    <h2>Sales Overview</h2>
                    <SegmentControl segments={options} onClick={toggleTimeframe} selected={timeframe} />
                    <div className="row-spaced">
                        <Statistic
                            value={price(data?.salesOverviewStatistics.stats.revenue.current!)}
                            delta={data?.salesOverviewStatistics.stats.revenue.delta}
                            label="Revenue"
                            loading={loading}
                        />
                        <Statistic
                            value={price(data?.salesOverviewStatistics.stats.grossSalesProfit.current!)}
                            delta={data?.salesOverviewStatistics.stats.grossSalesProfit.delta}
                            label="Profit from sales"
                            loading={loading}
                        />
                        <Statistic
                            value={String(data?.salesOverviewStatistics.stats.uniqueCustomers.current)}
                            delta={data?.salesOverviewStatistics.stats.uniqueCustomers.delta}
                            label="Unique Customers"
                            loading={loading}
                        />
                        <Statistic
                            value={String(data?.salesOverviewStatistics.stats.sales.current)}
                            delta={data?.salesOverviewStatistics.stats.sales.delta}
                            label="Sales"
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="SalesOverview__upper__overflow page-item">
                    <RevenueGraph data={data?.salesOverviewStatistics.revenueGraph} />
                </div>
            </div>
            <div className="SalesOverview__body page__body">
                <div className="SalesOverview__row-2">
                    <div className="page-item">
                        <h6>Revenue by division</h6>
                        <LabelledPieChart data={data?.salesOverviewStatistics.divisionRevenueGraph} dataKey="revenue">

                                {
                                    data?.salesOverviewStatistics.divisionRevenueGraph.map((entry) => (
                                        <Cell
                                        key={`segment-${entry.label}`}
                                        fill={divisionHexColorMapLighten[entry.label]}
                                        stroke={divisionHexColorMap[entry.label]}
                                        strokeWidth={1}
                                    />))
                                }
                        </LabelledPieChart>
                    </div>
                    <div className="page-item">
                        <h6>Revenue by lead source</h6>
                        <LabelledPieChart data={data?.salesOverviewStatistics.salesLeadRevenueGraph} dataKey="revenue">
                        {
                                        data?.salesOverviewStatistics.salesLeadRevenueGraph.map((entry,i) => (
                                            <Cell
                                                key={`segment-${entry.label}`}
                                                fill={colors[`blue${i+1}`]}
                                            />)
                                        )
                                    }
                        </LabelledPieChart>
                    </div>
                </div>
            </div>
        </div>
    )
}