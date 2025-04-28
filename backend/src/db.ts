import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbFile = path.resolve(__dirname, '../../db/blog.dev.db');
const db = new Database(dbFile);

// Run the DDL only on first boot
const schema = fs.readFileSync(path.resolve(__dirname, "../../db/schema.sql"), "utf8");
db.exec(schema);

export default db;