import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectAllSalesForEmployee(connection: Connection, employeeId: number, from: string): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .where('sale.employeeId = :employeeId', { employeeId })
        .andWhere('sale.dateOpened >= :from', { from })
        .getMany()
}