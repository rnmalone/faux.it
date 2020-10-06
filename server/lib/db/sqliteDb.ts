import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
const config = require('../../../config/project.config')

export default async function sqliteDb() {
    return open({
        filename: config.db.driver.filename,
        driver: sqlite3.Database
    })
}
