import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";
import {IDateRange} from "../../@types/Dates";

export default async function selectRevenueFromSales(connection: Connection, { dateFrom, dateTo }: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('sale.agreedPrice as revenue, sale.dateOpened as date')
        .andWhere('sale.dateOpened >= :dateFrom', { dateFrom })
        .andWhere('sale.dateOpened <= :dateTo', { dateTo })
        .andWhere('sale.status = :status', { status: SaleStatus.Complete })
        .execute()
}