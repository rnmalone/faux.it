import {employees, locations} from "../../../data";
import {Employee, Location, Sale} from "../../../entities";
import {Connection} from "typeorm";
import sales from "../../../data/sales";
import createMockSales from "./createMockSales";
import logger from "../../logger";

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
        logger.info(`Added ${employeeEntries.length} Employees`, { task: 'lib/injectMockData' })

        const locationEntries = locations.map((locationProperties) => applyProperties(new Location(), locationProperties as Partial<Location>))
        await connection.getRepository(Location).save(locationEntries)

        logger.info(`Added ${locationEntries.length} Locations`, { task: 'lib/injectMockData' })

        const mockGeneratedSales = createMockSales()

        const saleEntries = [...sales, ...mockGeneratedSales].map((sale) => applyProperties(new Sale(), sale as Partial<Sale>))
        await connection.manager.getRepository(Sale).save(saleEntries)

        logger.info(`Added ${saleEntries.length} sales`, { task: 'lib/injectMockData' })
    } catch (e) {
        console.error(`Failed to load test data: ${e}`)
    }
}
