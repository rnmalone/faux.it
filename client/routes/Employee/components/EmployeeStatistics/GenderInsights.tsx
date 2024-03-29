import BarDistribution from "../../../../components/BarDistribution";
import React from "react";
import {price} from "../../../../lib/utils/formatters";
import {colors} from "../../../../config/color.config";
import {ICustomerStats} from "../../../../../@types";
import {str} from "../../../../lib";

interface IGenderInsights {
    data: ICustomerStats[]
    totalProfit: number;
    totalRevenue: number;
}

export default function GenderInsights({data, totalProfit, totalRevenue}: IGenderInsights) {
    const male = data?.find(({gender}) => gender === 'Male')!
    const female = data?.find(({gender}) => gender === 'Female')!
    const totalSales = female?.saleCount + male?.saleCount

    return (
        <div className="page-item">
            <h6>Customer Insights</h6>
            <span className="centre-label">{str('statistic.sales')}</span>
            <BarDistribution
                left={{
                    label: str('general.male'),
                    color: colors.blue,
                    value: male?.saleCount,
                    pc: (100 / totalSales) * male?.saleCount
                }}
                right={{
                    label: str('general.female'),
                    color: colors.pink,
                    value: female?.saleCount,
                    pc: (100 / totalSales) * female?.saleCount
                }}
            />
            <span className="centre-label">{str('statistic.profitContribution')}</span>
            <BarDistribution
                left={{
                    label: str('general.male'),
                    color: colors.blue,
                    value: male?.saleCount,
                    pc: (100 / totalProfit) * male?.profit
                }}
                right={{
                    label: str('general.female'),
                    color: colors.pink,
                    value: female?.saleCount,
                    pc: (100 / totalProfit) * female?.profit
                }}
            />
            <span className="centre-label">{str('statistic.revenue')}</span>
            <BarDistribution
                left={{
                    label: str('general.male'),
                    color: colors.blue,
                    value: male?.revenue,
                    pc: (100 / totalRevenue) * male?.revenue
                }}
                right={{
                    label: str('general.female'),
                    color: colors.pink,
                    value: female?.revenue,
                    pc: (100 / totalRevenue) * female?.revenue
                }}
            />
            <span className="centre-label">{str('statistic.averageSpend')}</span>
            <div className="row-spaced">
                <p>{price(male?.averageSpend)}</p>
                <p>{price(female?.averageSpend)}</p>
            </div>
            <span className="centre-label">{str('statistic.averageProfit')}</span>
            <div className="row-spaced">
                <p>{price(male?.averageProfit)}</p>
                <p>{price(female?.averageProfit)}</p>
            </div>
            <span className="centre-label">{str('statistic.averageAge')}</span>
            <div className="row-spaced">
                <p>{male?.averageAge}</p>
                <p>{female?.averageAge}</p>
            </div>
        </div>
    )
}