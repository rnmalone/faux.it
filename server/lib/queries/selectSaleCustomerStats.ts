import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";
import {IDateRange} from "../../../@types/Dates";

export default async function selectSaleCustomerStats(connection: Connection, employeeId: number, {dateFrom, dateTo}: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('SUM(sale.agreedPrice - sale.itemCost) as profit,' +
            ' ROUND(AVG(sale.agreedPrice - sale.itemCost), 2) as averageProfit,' +
            ' ROUND(AVG(sale.agreedPrice), 2) as averageSpend, ' +
            ' ROUND(AVG(sale.customerAge), 2) as averageAge, ' +
            ' SUM(sale.agreedPrice) as revenue,' +
            ' COUNT(*) as saleCount, sale.customerGender as gender')
        .where('sale.employeeId = :employeeId', {employeeId})
        .andWhere('sale.dateOpened >= :dateFrom', {dateFrom})
        .andWhere('sale.dateOpened <= :dateTo', {dateTo})
        .andWhere('sale.status = :status', {status: SaleStatus.Complete})
        .groupBy('sale.customerGender')
        .execute()
}