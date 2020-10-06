import {Connection} from "typeorm";
import {IDateRange, SaleStatusPie} from "../../../@types";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";

export default async function selectSaleStatus(connection: Connection, {dateFrom, dateTo}: IDateRange): Promise<SaleStatusPie> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .where('sale.status = :complete', { complete: SaleStatus.Complete })
        .orWhere('sale.status = :closed', { closed: SaleStatus.Closed })
        .andWhere('sale.dateOpened >= :dateFrom', {dateFrom})
        .andWhere('sale.dateOpened <= :dateTo', {dateTo})
        .select('sale.status, COUNT(*) as value')
        .groupBy('sale.status')
        .execute()
}