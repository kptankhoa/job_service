import { Knex } from 'knex';
import { DB_CONFIG } from './general.config';
import { knexSnakeCaseMappers } from 'objection';

const db: Knex = require('knex')({
  client: 'pg',
  connection: {
    host: DB_CONFIG.DB_HOST,
    port: DB_CONFIG.DB_PORT,
    user: DB_CONFIG.DB_USER,
    password: DB_CONFIG.DB_PASSWORD,
    database: DB_CONFIG.DB_NAME,
    ssl: false
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migration',
    directory: './src/migrations',
    schemaName: DB_CONFIG.DB_SCHEMA
  },
  ...knexSnakeCaseMappers()
});

export default db;
