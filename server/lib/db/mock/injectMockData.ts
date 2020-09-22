import {employees, locations} from "../../../data";
import {Employee, Location, Sale} from "../../../entities";
import {Connection} from "typeorm";
import sales from "../../../data/sales";
import createMockSales from "./createMockSales";

function applyProperties<T>(obj: T, properties: Partial<T>) {
    return Object.entries(properties).reduce((a: T, [key, value]: [string, any]) => {
        obj[key as keyof T] = value;
        return obj
    }, obj)
}

export default async function injectMockData(connection: Connection) {
    try {
        const employeeEntries = employees.map((employeeProperties) => applyProperties(new Employee(), employeeProperties))
        await connection.getRepository(Employee).save(employeeEntries)
        console.log(`Added ${employeeEntries.length} Employees`)

        const locationEntries = locations.map((locationProperties) => applyProperties(new Location(), locationProperties as Partial<Location>))
        await connection.getRepository(Location).save(locationEntries)

        console.log(`Added ${locationEntries.length} Locations`)

        const mockGeneratedSales = createMockSales()

        const saleEntries = [...sales, ...mockGeneratedSales].map((sale) => applyProperties(new Sale(), sale as Partial<Sale>))
        await connection.manager.getRepository(Sale).save(saleEntries)

        console.log(`Added ${saleEntries.length} sales`)
    } catch (e) {
        console.error(`Failed to load test data: ${e}`)
    }
}
