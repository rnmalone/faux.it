import {APP_ENTITIES} from "../entities";
import {ConnectionOptions} from "typeorm";

const port = process.env.DB_PORT || 3306
const host = process.env.DB_HOST || 'localhost';

const dbConfig: {
    driver: any,
    orm: ConnectionOptions
} = {
    driver: {
        host,
        port,
        filename: process.env.DB_FILE || ':memory:'
    },
    orm: {
        type: "sqlite",
        // host,
        // port,
        // username: "root",
        // password: "admin",
        database: ":memory:",
        entities: APP_ENTITIES,
        synchronize: true,
        logging: false
    }
}

export default dbConfig;
