import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectSumProfitForDivisionGroupByEmployee(connection: Connection, from: string, division: string): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('SUM(sale.agreedPrice) - SUM(sale.itemCost) as profit, sale.employeeId')
        .where('sale.dateOpened >= :from', { from })
        .andWhere('sale.division = :division', { division })
        .groupBy('sale.employeeId')
        .orderBy('SUM(sale.agreedPrice) - SUM(sale.itemCost)','DESC')
        .execute()
}