import {APP_ENTITIES} from "../entities";
import {ConnectionOptions} from "typeorm";
const config = require('../../config/project.config')

const dbConfig: {
    driver: any,
    orm: ConnectionOptions
} = {
    driver: config.db.driver,
    orm: {
        ...config.db.orm,
        entities: APP_ENTITIES
    }
}

export default dbConfig;
