const { db } = require('../main')

async function createUser({ user, password, email }) {
  const sql = `
    INSERT INTO users (user, password, email)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = await db.run(sql, [
      user,
      password,
      email,
    ]);

    return { id: result.lastID, user, email }
  } catch (error) {
    throw error
  }
}

module.exports = { createUser };