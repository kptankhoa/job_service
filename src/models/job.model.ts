import { TABLE_NAME } from 'constant';
import { DB_CONFIG } from 'config';
import db from 'config/db.config';

interface Job {
  id: number;
  title: string;
  description: string;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const getDb = () => db<Job>(TABLE_NAME.JOB)
  .withSchema(DB_CONFIG.DB_SCHEMA);

export const findAll = async (page: number = 0, size: number = 5) => {
  return getDb()
    .limit(size)
    .offset(page * size)
    .orderBy('updatedAt', 'desc');
};

export const countAll = async () => {
  return getDb().count();
};

export const findById = async (id: number) => {
  return getDb()
    .where({ id })
    .first();
};

export const create = async (body: any) => {
  return getDb()
    .insert(body);
};

export const updateById = async (id: number, body: any) => {
  return getDb()
    .where({ id })
    .update({
      ...body,
      updatedAt: new Date()
    });
};

export const deleteById = async (id: number) => {
  return db<Job>(TABLE_NAME.JOB)
    .withSchema(DB_CONFIG.DB_SCHEMA)
    .where({ id })
    .del();
};
