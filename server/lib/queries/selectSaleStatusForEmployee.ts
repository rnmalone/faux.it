import {EmployeeSaleStatusPie} from "../../@types/Stats/Employee";
import {IDateRange} from "../../@types/Dates";
import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectSaleStatusForEmployee(connection: Connection, employeeId: number, { dateFrom, dateTo }: IDateRange): Promise<EmployeeSaleStatusPie> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('sale.status as status, COUNT(*) as value')
        .where('sale.employeeId = :employeeId', { employeeId })
        .andWhere('sale.dateClosed >= :dateFrom', { dateFrom })
        .andWhere('sale.dateClosed <= :dateTo', { dateTo })
        .groupBy('sale.status')
        .execute()
}