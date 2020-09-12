import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import dbConfig from "../../config/database.config";

export default async function initDb() {
    return open({
        filename: dbConfig.driver.filename,
        driver: sqlite3.Database
    })
}
