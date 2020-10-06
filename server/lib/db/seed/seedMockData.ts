import {employees, locations} from "../../../data";
import {Employee, Location, Sale} from "../../../entities";
import { getConnection} from "typeorm";
import createMockSales from "./createMockSales";
import logger from "../../logger";

export default async function seedMockData() {
    logger.info('--- Seeding mock data ---')
    try {
        const connection = await getConnection()
        await connection.getRepository(Employee).save(employees)
        logger.info(`Added ${employees.length} Employees`, {task: 'lib/seedMockData'})

        await connection.getRepository(Location).save(locations)

        logger.info(`Added ${locations.length} Locations`, {task: 'lib/seedMockData'})

        const mockGeneratedSales = createMockSales()

        // const saleEntries = mockGeneratedSales.map((sale) => applyProperties(new Sale(), sale as Partial<Sale>))
        await connection.manager.getRepository(Sale).save(mockGeneratedSales)

        logger.info(`Added ${mockGeneratedSales.length} sales`, {task: 'lib/seedMockData'})
    } catch (e) {
        logger.error(`Failed to seed test data: ${e}`)
    } finally {
        logger.info('--- Mock seed finished ---')
    }
}
