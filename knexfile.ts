import type { Knex } from 'knex';
import { DB_CONFIG } from './src/config';
import { knexSnakeCaseMappers } from 'objection';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    database: DB_CONFIG.DB_NAME,
    user: DB_CONFIG.DB_USER,
    password: DB_CONFIG.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migration',
    directory: './src/migrations',
    schemaName: DB_CONFIG.DB_SCHEMA,
    extension: 'ts'
  },
  ...knexSnakeCaseMappers()
};

module.exports = config;
