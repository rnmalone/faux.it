import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";
import {Connection} from "typeorm";
import {IDateRange} from "../../../@types/Dates";


export default async function selectReducibleStatsForAllSales(connection: Connection, { dateFrom, dateTo }: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('SUM(sale.agreedPrice) as revenue, ' +
            'SUM(sale.agreedPrice - sale.itemCost) as grossSalesProfit,' +
            'COUNT(DISTINCT customerName) as uniqueCustomers, ' +
            'COUNT(*) as sales')
        .andWhere('sale.dateOpened >= :dateFrom', { dateFrom })
        .andWhere('sale.dateOpened <= :dateTo', { dateTo })
        .andWhere('sale.status = :status', { status: SaleStatus.Complete })
        .execute()
}