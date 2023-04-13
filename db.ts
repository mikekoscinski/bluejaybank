const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

module.exports = {
  query: (text: any, params: any) => pool.query(text, params),
};
