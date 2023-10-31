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

const jobDb = db<Job>(TABLE_NAME.JOB)
  .withSchema(DB_CONFIG.DB_SCHEMA);

export const findAll = async (page: number = 0, size: number = 5) => {
  return jobDb
    .limit(size)
    .offset(page * size);
};

export const countAll = async () => {
  return jobDb.count();
};

export const findById = async (id: number) => {
  return jobDb
    .where({ id })
    .first();
};

export const create = async (body: any) => {
  return jobDb
    .insert(body)
    .returning(['id', 'expiryDate']);
};

export const updateById = async (id: number, body: any) => {
  return jobDb
    .where({ id })
    .update({
      ...body,
      updatedAt: new Date()
    });
};

export const deleteById = async (id: number) => {
  return jobDb
    .where({ id })
    .del();
};
