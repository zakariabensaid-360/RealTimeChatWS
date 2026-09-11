const { db } = require('../main')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIAUE,
  isOnline BOOLEAN,
  BlockList JSON,
  Conversations JSON
);
`)