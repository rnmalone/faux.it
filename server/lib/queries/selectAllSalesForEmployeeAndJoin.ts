import {Connection} from "typeorm";
import {Sale} from "../../entities";

export default async function selectAllSalesForEmployeeAndJoin(connection: Connection): Promise<Sale[]> {
    return await connection
        .getRepository(Sale)
        .createQueryBuilder('sale')
        .innerJoinAndMapOne('sale.employee', 'employee', 'employee', 'employee.id = sale.employeeId')
        .getMany()
}

