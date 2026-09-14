import express, { json } from "express";
import { Database } from "sqlite";
import jwt from "jsonwebtoken";
import "dotenv";
import ws from "ws";
import sqlite3 from "sqlite3";
import cors from "cors";
import CreateUserTable from "./models/tables/CreateUserTable";
import CreateMessagesTable from "./models/tables/CreateMessagesTable";
const db = new Database({ filename: "./users", driver: sqlite3.Database })
const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(json())




app.listen(PORT, () => {
    CreateUserTable();
    CreateMessagesTable();
    
    
})


export {
    db
}