import {Connection} from "typeorm";
import {IDateRange} from "../../../@types/Dates";
import {Employee, Sale, Location} from "../../entities";
import {SaleStatus} from "../../entities/Sale";

export default async function selectSalesStatsForLocations(connection: Connection, {dateFrom, dateTo}: IDateRange) {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .innerJoin(Employee, 'employee', 'sale.employeeId = employee.id')
        .innerJoin(Location, 'location', 'employee.locationId = location.id')
        .select(['SUM(sale.agreedPrice) as revenue', 'SUM(sale.agreedPrice - sale.itemCost) as profit', 'COUNT(*) as sales'])
        .addSelect(['location.id as locationId', 'location.address as address', 'location.countryName as countryName', 'location.countryCode as countryCode'])
        .andWhere('sale.dateOpened >= :dateFrom', {dateFrom})
        .andWhere('sale.dateOpened <= :dateTo', {dateTo})
        .andWhere('sale.status = :status', {status: SaleStatus.Complete})
        .groupBy('location.id')
        .execute()
}