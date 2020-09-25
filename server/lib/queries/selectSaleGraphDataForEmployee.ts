import {EmployeeSaleStatusPie} from "../../@types/Stats/Employee";
import {IDateRange} from "../../@types/Dates";
import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectSaleGraphDataForEmployee(connection: Connection, employeeId: number, { dateFrom, dateTo }: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('sale.status, sale.dateClosed')
        .where('sale.employeeId = :employeeId', { employeeId })
        .andWhere('sale.dateClosed >= :dateFrom', { dateFrom })
        .andWhere('sale.dateClosed <= :dateTo', { dateTo })
        .execute()
}