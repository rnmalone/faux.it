import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";
import {IDateRange} from "../../../@types/Dates";

export default async function selectSumSalesForDivisionGroupByEmployee(connection: Connection, { dateFrom, dateTo }: IDateRange, division: string): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('COUNT(*) as sales, sale.employeeId')
        .where('sale.dateOpened >= :dateFrom', { dateFrom })
        .where('sale.dateOpened <= :dateTo', { dateTo })
        .andWhere('sale.division = :division', { division })
        .andWhere('sale.status = :status', { status: SaleStatus.Complete })
        .groupBy('sale.employeeId')
        .orderBy('COUNT(*)','DESC')
        .execute()
}