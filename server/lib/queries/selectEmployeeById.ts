import {Connection} from "typeorm";
import Employee from "../../entities/Employee";

export default async function selectEmployeeById(connection: Connection, id: string): Promise<Employee> {
    return await connection
        .getRepository(Employee)
        .createQueryBuilder("employee")
        .where('EmployeeList.id = :id', {id})
        .innerJoinAndMapOne('employee.location', 'Location', 'location', 'location.id = employee.locationId')
        .innerJoinAndMapMany('employee.sales', 'Sale', 'sale', 'sale.employeeId = employee.id')
        .getOne()
}
