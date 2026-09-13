import { db } from "../../server";
import compareHash from "../../utilities/compareHash"; // Use your compareHash helper

export async function getUser(email: string, passwordInput: string) {
  // 1. Fetch the user record by email only
  const user = await db.get(
    'SELECT id, username, permissions, password FROM users WHERE email = ?',
    [email]
  );

  // 2. Return null if no user exists with that email
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // 3. Verify the plain password against the stored bcrypt hash
  const isPasswordValid = await compareHash(passwordInput, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  // 4. Clean up sensitive data before returning
  const { password: _hash, ...userPayload } = user;
  return userPayload;
}