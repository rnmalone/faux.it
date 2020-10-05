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
import {str} from "../../../lib";

export default function SalesOverview() {
    const {timeframe, toggleTimeframe, options} = useTimeframe()
    const {data, loading} = useQuery<ISalesOverviewStatisticsResponse, { timeframe: number }>(salesOverviewStatisticsQuery, {variables: {timeframe}})

    return (
        <div className="SalesOverview">
            <div className="SalesOverview__upper">
                <div className="SalesOverview__upper__inner">
                    <h2>{str('pages.sales.overview.title')}</h2>
                    <SegmentControl segments={options} onClick={toggleTimeframe} selected={timeframe}/>
                    <div className="row-spaced">
                        <Statistic
                            value={price(data?.salesOverviewStatistics.stats.revenue.current!)}
                            delta={data?.salesOverviewStatistics.stats.revenue.delta}
                            label={str('statistic.revenue')}
                            isPositive={data?.salesOverviewStatistics.stats.revenue.delta! > 0}
                            loading={loading}
                        />
                        <Statistic
                            value={price(data?.salesOverviewStatistics.stats.grossSalesProfit.current!)}
                            delta={data?.salesOverviewStatistics.stats.grossSalesProfit.delta}
                            label={str('statistic.salesProfit')}
                            isPositive={data?.salesOverviewStatistics.stats.grossSalesProfit.delta! > 0}
                            loading={loading}
                        />
                        <Statistic
                            value={String(data?.salesOverviewStatistics.stats.uniqueCustomers.current)}
                            delta={data?.salesOverviewStatistics.stats.uniqueCustomers.delta}
                            label={str('statistic.uniqueCustomers')}
                            isPositive={data?.salesOverviewStatistics.stats.uniqueCustomers.delta! > 0}
                            loading={loading}
                        />
                        <Statistic
                            value={String(data?.salesOverviewStatistics.stats.sales.current)}
                            delta={data?.salesOverviewStatistics.stats.sales.delta}
                            label={str('statistic.sales')}
                            isPositive={data?.salesOverviewStatistics.stats.sales.delta! > 0}
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="SalesOverview__upper__overflow page-item">
                    <RevenueGraph data={data?.salesOverviewStatistics.revenueGraph}/>
                </div>
            </div>
            <div className="SalesOverview__body page__body">
                <div className="SalesOverview__row-2">
                    <div className="page-item">
                        <h6>{str('pages.sales.overview.divisionRevenue')}</h6>
                        <LabelledPieChart
                            data={data?.salesOverviewStatistics.divisionRevenueGraph}
                            dataKey="revenue"
                            labelIntlPrefix="division"
                        >
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
                        <h6>{str('pages.sales.overview.leadSource')}</h6>
                        <LabelledPieChart
                            data={data?.salesOverviewStatistics.salesLeadRevenueGraph}
                            dataKey="revenue"
                            labelIntlPrefix="lead.source"
                        >
                            {
                                data?.salesOverviewStatistics.salesLeadRevenueGraph.map((entry, i) => (
                                    <Cell
                                        key={`segment-${entry.label}`}
                                        fill={colors[`blue${i + 1}`]}
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