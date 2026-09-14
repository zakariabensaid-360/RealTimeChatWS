import { db } from "../../server";
import hash from "../../utilities/hash";

interface UserInput {
    username: string
    email: string
    password: string, 
}

export default async function  CreateUser({username, email, password}: UserInput) {
    let password_hash = await hash(password)
    try {
    db.run("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, password_hash])
    return "The User has been created"
    } catch (error) {
        throw error
    }
}

export type {
    UserInput
}