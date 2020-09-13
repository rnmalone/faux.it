import {Connection} from "typeorm";
import Employee from "../../entities/Employee";
import {Sale} from "../../entities";

export default async function selectAllSales(connection: Connection): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .innerJoinAndMapOne('sale.employee', 'employee', 'employee', 'employee.id = sale.employeeId')
        .getMany()
}
