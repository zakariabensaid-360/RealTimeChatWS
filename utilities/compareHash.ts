import bcrypt from 'bcrypt';


export default async function compareHash(password: string, hashedPassword: string) {
    try {
        const result = await bcrypt.compare(password, hashedPassword)
        return result
    } catch (error) {
        return false
    }
  
}


