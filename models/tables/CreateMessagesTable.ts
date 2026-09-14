import { db } from "../../server";

interface Messages {
    uuid: string
    messages: {
        message: string
        created_at:  string
    }[]
}

export default function CreateMessagesTable() {
    db.exec(`PRAGMA foreign_keys = ON;`);

    db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            uuid TEXT NOT NULL UNIQUE,
            user_id INTEGER NOT NULL,
            messages TEXT NOT NULL DEFAULT '[]',
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
}


export type {
    Messages,
}


