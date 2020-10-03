import {StatisticWidget} from "../../../../components/Statistic";
import {price, rank} from "../../../../lib/utils/formatters";
import {rankColorMap} from "../../../../config/color.config";
import React from "react";
import {IEmployeeStatisticsResponse} from "../../../../../@types";
import {str} from "../../../../lib";

export interface ISmallStats {
    data: IEmployeeStatisticsResponse['employeeStatistics.stats']
    loading: boolean
}

export default function SmallStats({data, loading}: ISmallStats) {
    return (
        <section className="Statistics__flex-row">
            <StatisticWidget
                loading={loading}
                label={str('statistic.divisionSalesRank')}
                width="50"
                value={rank(data?.employeeDivisionSalesRank?.current)}
                delta={data?.employeeDivisionSalesRank?.delta}
                borderColor={rankColorMap[data?.employeeDivisionSalesRank?.current]}
            />
            <StatisticWidget
                loading={loading}
                width="50"
                label={str('statistic.divisionProfitRank')}
                value={rank(data?.employeeDivisionProfitRank?.current)}
                delta={data?.employeeDivisionProfitRank?.delta}
                borderColor={rankColorMap[data?.employeeDivisionProfitRank?.current]}
            />
            <StatisticWidget
                loading={loading}
                width="160"
                label={str('statistic.commissionEarnings')}
                value={price(data?.commissionEarnings?.current)}
                delta={data?.commissionEarnings?.delta}
                isPositive={data?.commissionEarnings?.delta > 0}
            />
            <StatisticWidget
                loading={loading}
                width="160"
                label={str('statistic.averageSaleProfit')}
                value={price(data?.averageProfit?.current)}
                delta={data?.averageProfit?.delta}
                isPositive={data?.averageProfit?.delta > 0}
            />
        </section>
    )
}