import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {IDateRange} from "../../@types/Dates";

export default async function selectSumProfitForDivisionGroupByEmployee(connection: Connection, { dateFrom, dateTo }: IDateRange, division: string): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('SUM(sale.agreedPrice) - SUM(sale.itemCost) as profit, sale.employeeId')
        .where('sale.dateOpened >= :dateFrom', { dateFrom })
        .andWhere('sale.dateOpened <= :dateTo', { dateTo })
        .andWhere('sale.division = :division', { division })
        .groupBy('sale.employeeId')
        .orderBy('SUM(sale.agreedPrice) - SUM(sale.itemCost)','DESC')
        .execute()
}