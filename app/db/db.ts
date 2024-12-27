
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const openDb = async ()=>{
    return open({
        filename: "./app/db/database.db", // realative path
        driver: sqlite3.Database
    })
}
