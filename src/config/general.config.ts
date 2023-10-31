require('dotenv').config({ path: './env/.env' });

export const PORT = process.env.PORT || 8080;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DB_CONFIG = {
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_NAME: process.env.DB_NAME || 'access-job',
  DB_SCHEMA: process.env.DB_SCHEMA || 'access',
};

