import {Connection} from "typeorm";
import {Sale} from "../../entities";
import {SaleStatus} from "../../entities/Sale";
import {IDateRange} from "../../@types/Dates";

export default async function selectProfitFromSalesByEmployee(connection: Connection, employeeId: number, { dateFrom, dateTo }: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .select('sale.agreedPrice - sale.itemCost as profit, sale.dateOpened as date')
        .where('sale.employeeId = :employeeId', { employeeId })
        .andWhere('sale.dateOpened >= :dateFrom', { dateFrom })
        .andWhere('sale.dateOpened <= :dateTo', { dateTo })
        .andWhere('sale.status = :status', { status: SaleStatus.Complete })
        .execute()
}