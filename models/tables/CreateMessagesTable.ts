import { db } from "../../server";

interface Messages {
    messages: {
        message: string
        created_at:  string
    }
}

export default function CreateUserTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            uuid TEXT NOT NULL UNIQUE,
            messages TEXT NOT NULL DEFAULT '[]'
        );
    `);
}


export type {
    Messages,
}


