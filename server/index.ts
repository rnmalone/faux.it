import "reflect-metadata";
import server from './server';
import {initDb} from "./lib/db";
import injectMockData from "./lib/db/injectMockData";

const debug = require('debug')('app:bin:server');
const project = require('../config/project.config');


(async () => {

    const database = await initDb();

    await injectMockData()
})()

server.listen(project.server.port);

debug(`server is now running at http://${project.server.host}:${project.server.port}.`);
