import bcrypt from 'bcrypt';
const saltRounds = 10;

export default async function hash(password: string) {
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  return hashedPassword
}


