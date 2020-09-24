import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {IDateRange} from "../../@types/Dates";

export default async function selectAllSalesForEmployee(connection: Connection, employeeId: number, { dateFrom, dateTo }: IDateRange): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .where('sale.employeeId = :employeeId', { employeeId })
        .andWhere('sale.dateOpened >= :dateFrom', { dateFrom })
        .andWhere('sale.dateOpened <= :dateTo', { dateTo })
        .getMany()
}