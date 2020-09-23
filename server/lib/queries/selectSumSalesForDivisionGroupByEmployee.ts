import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";

export default async function selectSumSalesForDivisionGroupByEmployee(connection: Connection, from: string, division: string): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('COUNT(*) as sales, sale.employeeId')
        .where('sale.dateOpened >= :from', { from })
        .andWhere('sale.division = :division', { division })
        .andWhere('sale.status = :status', { status: SaleStatus.Complete })
        .groupBy('sale.employeeId')
        .orderBy('COUNT(*)','DESC')
        .execute()
}