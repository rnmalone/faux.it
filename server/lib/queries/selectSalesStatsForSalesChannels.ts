import {Connection} from "typeorm";
import {IDateRange} from "../../../@types/Dates";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";

export default async function selectSalesStatsForSalesChannels(connection: Connection, {dateFrom, dateTo}: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('SUM(sale.agreedPrice) as revenue, SUM(sale.agreedPrice - sale.itemCost) as profit, COUNT(*) as sales, sale.leadSource as label')
        .andWhere('sale.dateOpened >= :dateFrom', {dateFrom})
        .andWhere('sale.dateOpened <= :dateTo', {dateTo})
        .andWhere('sale.status = :status', {status: SaleStatus.Complete})
        .groupBy('sale.leadSource')
        .execute()
}