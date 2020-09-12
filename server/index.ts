import "reflect-metadata";
import dotenv from 'dotenv';
import server from './server';
import {initDb} from "./lib/db";
import injectMockData from "./lib/db/injectMockData";
import {createConnection} from "typeorm";
import dbConfig from "./config/database.config";

dotenv.config();

const debug = require('debug')('app:bin:server');
const project = require('../config/project.config');


(async () => {
    const database = await initDb();
    const connection = await createConnection(dbConfig.orm);

    await injectMockData(connection)
    server(connection);
})()


debug(`server is now running at http://${project.server.host}:${project.server.port}.`);
