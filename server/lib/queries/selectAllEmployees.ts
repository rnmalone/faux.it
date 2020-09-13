import {Connection} from "typeorm";
import Employee from "../../entities/Employee";

export default async function selectAllEmployees(connection: Connection): Promise<Employee[]> {
    return await connection
        .getRepository(Employee)
        .createQueryBuilder("employee")
        .innerJoinAndMapOne('employee.location', 'Location', 'location', 'location.id = employee.locationId')
        .getMany()
}
