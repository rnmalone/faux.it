import {employees, locations} from "../../data";
import {Employee, Location, Sale} from "../../entities";
import {Connection, createConnection} from "typeorm";
import dbConfig from "../../config/database.config";
import sales from "../../data/sales";

function applyProperties<T>(obj: T, properties: Partial<T>) {
    return Object.entries(properties).reduce((a: T, [key, value]: [string, any]) => {
        obj[key as keyof T] = value;
        return obj
    }, obj)
}

export default async function injectMockData(connection: Connection) {
    try {

        const employeeEntries = await Promise.all(
            employees.map((employeeProperties) => {
                const employee = applyProperties(new Employee(), employeeProperties)

                return connection.manager.save(employee)
            })
        )

        console.log(`Added ${employeeEntries.length} Employees`)


        const locationEntries = await Promise.all(
            locations.map((locationProperties) => {
                const location = applyProperties(new Location(), locationProperties as Partial<Location>)

                return connection.manager.save(location)
            })
        )

        console.log(`Added ${locationEntries.length} Locations`)

        const saleEntries = await Promise.all(
            sales.map((saleProperties) => {
                const sale = applyProperties(new Sale(), saleProperties as Partial<Sale>)

                return connection.manager.save(sale)
            })
        )

        console.log(`Added ${saleEntries.length} sales`)
    } catch(e) {
        console.error(`Failed to load test data: ${e}`)
    }
}
