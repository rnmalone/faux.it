import {SaleDTO, SaleStatus} from "../entities/Sale";
import moment from "moment";

export interface IReducedSalesMetrics {
    totalRevenue: number;
    salesComplete: number;
    salesFailed: number;
    totalProfit: number;
    totalDaysBetweenOpenAndClosedSales: number;
}

export default function extractSalesMetrics(sales: SaleDTO[]): IReducedSalesMetrics {
    return sales.reduce((a: IReducedSalesMetrics, sale: SaleDTO) => {
        let {
            totalRevenue,
            salesComplete,
            salesFailed,
            totalProfit,
            totalDaysBetweenOpenAndClosedSales
        } = a

        if(sale.status === SaleStatus.Complete) {
            totalRevenue = totalRevenue + sale.agreedPrice;
            salesComplete = salesComplete + 1;

            const itemProfit = sale.agreedPrice - sale.itemCost;
            totalProfit = totalProfit + itemProfit;

            totalDaysBetweenOpenAndClosedSales =  totalDaysBetweenOpenAndClosedSales + moment.duration(moment(sale.dateClosed).diff(moment(sale.dateOpened))).asDays();
        }

        if(sale.status === SaleStatus.Closed) {
            salesFailed = salesFailed + 1;
        }

        return {
            totalRevenue,
            salesComplete,
            totalProfit,
            salesFailed,
            totalDaysBetweenOpenAndClosedSales
        }

    }, {
        totalRevenue: 0,
        salesComplete: 0,
        salesFailed: 0,
        totalProfit: 0,
        totalDaysBetweenOpenAndClosedSales: 0
    })
}