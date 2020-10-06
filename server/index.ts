import "reflect-metadata";
import dotenv from 'dotenv';
import server from './server';
import {sqliteDb} from "./lib/db";
import seedMockData from "./lib/db/seed/seedMockData";
import {createConnection} from "typeorm";
import dbConfig from "./config/database.config";
import {logger} from "./lib";

dotenv.config();

const project = require('../config/project.config');


(async () => {
    let connection;

    try {
        connection = await createConnection(dbConfig.orm);
        logger.info(`Connected to ${project.db.orm.type} database at http://${project.db.host}:${project.db.port}.`)
    } catch(e) {
        logger.error('Error creating connection to configured database. Falling back to sqlite.')

        await sqliteDb();
    }

    if(connection) {
        await seedMockData(connection)
        server(connection);
    } else {
        throw new Error('Cannot create server without an active db connection')
    }
})()


logger.info(`Server is now running at http://${project.server.host}:${project.server.port}.`);
