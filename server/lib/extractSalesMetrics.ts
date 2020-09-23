import {SaleDTO, SaleStatus} from "../entities/Sale";
import moment from "moment";

export interface IReducedSalesMetrics {
    totalRevenue: number;
    salesComplete: number;
    salesFailed: number;
    totalProfit: number;
    averageSaleCloseTimeDays: number;
}

export default function extractSalesMetrics(sales: SaleDTO[]): IReducedSalesMetrics {
    return sales.reduce((a: IReducedSalesMetrics, sale: SaleDTO) => {
        let {
            totalRevenue,
            salesComplete,
            salesFailed,
            totalProfit,
            averageSaleCloseTimeDays,
        } = a

        if(sale.status === SaleStatus.Complete) {
            totalRevenue = totalRevenue + sale.agreedPrice;
            salesComplete = salesComplete + 1;

            const itemProfit = sale.agreedPrice - sale.itemCost;
            totalProfit = totalProfit + itemProfit;

            const saleCloseDays = moment.duration(moment(sale.dateClosed).diff(moment(sale.dateOpened))).asDays();
            averageSaleCloseTimeDays = Math.round((averageSaleCloseTimeDays + saleCloseDays) / salesComplete)
        }

        if(sale.status === SaleStatus.Closed) {
            salesFailed = salesFailed + 1;
        }

        return {
            totalRevenue,
            salesComplete,
            totalProfit,
            salesFailed,
            averageSaleCloseTimeDays
        }

    }, {
        totalRevenue: 0,
        salesComplete: 0,
        salesFailed: 0,
        totalProfit: 0,
        averageSaleCloseTimeDays: 0,
    })
}