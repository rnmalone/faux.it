import {IDateRange} from "../../../@types/Dates";
import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectSaleStatusGraphDataForEmployee(connection: Connection, employeeId: number, { dateFrom, dateTo }: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select("CASE WHEN sale.status ='COMPLETE' THEN 1 ELSE 0 END as completed, CASE WHEN sale.status ='CLOSED' THEN 1 ELSE 0 END as closed, sale.dateClosed as date")
        .where('sale.employeeId = :employeeId', { employeeId })
        .andWhere('sale.dateClosed >= :dateFrom', { dateFrom })
        .andWhere('sale.dateClosed <= :dateTo', { dateTo })
        .execute()
}