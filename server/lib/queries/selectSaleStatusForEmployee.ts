import {SaleStatusPie, IDateRange} from "../../../@types";
import {Brackets, Connection} from "typeorm";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";

export default async function selectSaleStatusForEmployee(connection: Connection, employeeId: number, {dateFrom, dateTo}: IDateRange): Promise<SaleStatusPie> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .where(new Brackets(qb => {
            qb.where('sale.status = :complete', { complete: SaleStatus.Complete })
            qb.orWhere('sale.status = :closed', { closed: SaleStatus.Closed })
        }))
        .andWhere('sale.dateOpened >= :dateFrom', {dateFrom})
        .andWhere('sale.dateOpened <= :dateTo', {dateTo})
        .andWhere('sale.employeeId = :employeeId', {employeeId})
        .select('sale.status, COUNT(*) as value')
        .groupBy('sale.status')
        .execute()
}