import { db } from "../../server";



export default function DeleteUser(id: number) {
    try {
        db.run("DELETE FROM users WHERE id = ?", [id])
        return "the user has been deleted"
    } catch (error) {
        throw error
    }

}


