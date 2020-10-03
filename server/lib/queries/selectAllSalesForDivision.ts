import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectAllSalesForEmployee(connection: Connection, from: string, division: string): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .where('sale.dateOpened >= :from', {from})
        .andWhere('sale.division = :division', {division})
        .getMany()
}