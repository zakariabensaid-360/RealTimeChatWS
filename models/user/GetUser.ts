import { db } from "../../server";
import compareHash from "../../utilities/compareHash"; 

export async function getUser(email: string, passwordInput: string) {
  const user = await db.get(
    'SELECT id, username, permissions, password FROM users WHERE email = ?',
    [email]
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isPasswordValid = await compareHash(passwordInput, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  const { password: _hash, ...userPayload } = user;
  return userPayload;
}