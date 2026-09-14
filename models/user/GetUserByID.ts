import { db } from "../../server";

export default function GetUserByID(id: number) {
    try {
        db.run("SELECT (username, email, conversations, permissions) FROM users WHERE id = ?", [id])
    } catch (error) {
        
    }
}
