require('dotenv').config()
const { Pool } = require('pg');

const {DATABASE, DB_HOST ,DB_PASSWORD ,DB_PORT ,DB_USER} = process.env

const pool = new Pool({
  database: DATABASE,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: DB_PORT,
  user: DB_USER,
});

module.exports = {
  query: (text: string, params: any, callback: Function) => {
    return pool.query(text, params, callback);
  },
};