import {logger} from "../../index";
import seedMockData from "./seedMockData";
const config = require('../../../../config/project.config')

export default async function seed(): Promise<void> {
    if(!config.seedData && !config.forceSeed) {
        logger.info('Data seed is disabled')

        return void 0;
    }

    await seedMockData()
}