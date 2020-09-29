import {StatisticWidget} from "../../../components/Statistic";
import {price, rank} from "../../../lib/utils/formatters";
import {rankColorMap} from "../../../config/color.config";
import React from "react";


export default function SmallStats({ data, loading }) {
    return (
        <section className="Statistics__flex-row">
            <StatisticWidget
                loading={loading}
                label={"Division Sales Rank"}
                width="50"
                value={rank(data?.employeeStatistics?.stats?.employeeDivisionSalesRank?.current)}
                delta={data?.employeeStatistics?.stats?.employeeDivisionSalesRank?.delta}
                borderColor={rankColorMap[data?.employeeStatistics?.stats?.employeeDivisionSalesRank?.current]}
            />
            <StatisticWidget
                loading={loading}
                width="50"
                label={"Division Profit Rank"}
                value={rank(data?.employeeStatistics?.stats?.employeeDivisionProfitRank?.current)}
                delta={data?.employeeStatistics?.stats?.employeeDivisionProfitRank?.delta}
                borderColor={rankColorMap[data?.employeeStatistics?.stats?.employeeDivisionProfitRank?.current]}
            />
            <StatisticWidget
                loading={loading}
                width="160"
                label="Commission Earnings"
                value={price(data?.employeeStatistics?.stats?.commissionEarnings?.current)}
                delta={data?.employeeStatistics?.stats?.commissionEarnings?.delta}
                isPositive={data?.employeeStatistics?.stats?.commissionEarnings?.delta > 0}
            />
            <StatisticWidget
                loading={loading}
                width="160"
                label="Average Sale Profit"
                value={price(data?.employeeStatistics?.stats?.averageProfit?.current)}
                delta={data?.employeeStatistics?.stats?.averageProfit?.delta}
                isPositive={data?.employeeStatistics?.stats?.averageProfit?.delta > 0}
            />
        </section>
    )
}