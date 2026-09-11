const { db } = require('../main');

async function Login({ email, password }) {
  // Corrected SQL syntax and table target
  const sql = `
    SELECT id, user, email, isOnline, BlockList, Conversations 
    FROM users 
    WHERE email = ? AND password = ?
  `;

  try {
    
    const userRow = await db.get(sql, [email, password]);

    if (!userRow) {
      return null; 
    }

    return userRow;
  } catch (error) {
    throw error;
  }
}

module.exports = { Login };


