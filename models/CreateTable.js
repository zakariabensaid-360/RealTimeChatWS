const { db } = require('../main')


const CreateTableUser = () => {
    db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  isOnline BOOLEAN DEFAULT FALSE,
  BlockList JSON DEFAULT '[]',
  Conversations JSON DEFAULT '[]'
);
`)


}


module.exports = {
    CreateTableUser
}