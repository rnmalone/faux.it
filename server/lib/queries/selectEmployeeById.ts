import {Connection} from "typeorm";
import Employee from "../../entities/Employee";

export default async function selectEmployeeById(connection: Connection, id: number): Promise<Employee | undefined> {
    return await connection
        .getRepository(Employee)
        .createQueryBuilder("employee")
        .where('employee.id = :id', {id})
        .innerJoinAndMapOne('employee.location', 'Location', 'location', 'location.id = employee.locationId')
        .innerJoinAndMapMany('employee.sales', 'Sale', 'sale', 'sale.employeeId = employee.id')
        .getOne()
}
