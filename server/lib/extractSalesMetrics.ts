import {SaleDTO, SaleStatus} from "../entities/Sale";
import moment from "moment";
import {Sale} from "../entities";

export interface IReducedSalesMetrics {
    totalRevenue: number;
    salesComplete: number;
    salesFailed: number;
    totalProfit: number;
    totalDaysBetweenOpenAndClosedSales: number;
    totalItemCost: number;
}

export default function extractSalesMetrics(sales: Sale[]): IReducedSalesMetrics {
    return sales.reduce((a: IReducedSalesMetrics, sale: Sale) => {
        let {
            totalRevenue,
            salesComplete,
            salesFailed,
            totalProfit,
            totalItemCost,
            totalDaysBetweenOpenAndClosedSales
        } = a

        if (sale.status === SaleStatus.Complete) {
            totalRevenue = totalRevenue + sale.agreedPrice;
            salesComplete = salesComplete + 1;

            const itemProfit = sale.agreedPrice - sale.itemCost;
            totalProfit = totalProfit + itemProfit;
            totalItemCost = totalItemCost + sale.itemCost;

            totalDaysBetweenOpenAndClosedSales = totalDaysBetweenOpenAndClosedSales + moment.duration(moment(sale.dateClosed).diff(moment(sale.dateOpened))).asDays();
        }

        if (sale.status === SaleStatus.Closed) {
            salesFailed = salesFailed + 1;
        }

        return {
            totalRevenue,
            salesComplete,
            totalProfit,
            salesFailed,
            totalDaysBetweenOpenAndClosedSales,
            totalItemCost
        }

    }, {
        totalRevenue: 0,
        salesComplete: 0,
        salesFailed: 0,
        totalProfit: 0,
        totalDaysBetweenOpenAndClosedSales: 0,
        totalItemCost: 0
    })
}