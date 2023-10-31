import { Knex } from 'knex';
import { DB_CONFIG } from '../config';
import { TABLE_NAME } from '../constant';

const sampleJobs = [
  {
    title: 'Software Developer',
    description: 'Develop software applications',
    expiryDate: '2023-12-31',
  },
  {
    title: 'Web Developer',
    description: 'Design and build websites',
    expiryDate: '2023-11-30',
  },
  {
    title: 'Data Scientist',
    description: 'Analyze and interpret data',
    expiryDate: '2024-02-28',
  },
  {
    title: 'UI/UX Designer',
    description: 'Create user-friendly interfaces',
    expiryDate: '2024-01-15',
  },
  {
    title: 'Network Engineer',
    description: 'Manage network infrastructure',
    expiryDate: '2023-10-31',
  },
  {
    title: 'Database Administrator',
    description: 'Administer and optimize databases',
    expiryDate: '2024-03-20',
  },
  {
    title: 'Product Manager',
    description: 'Lead product development',
    expiryDate: '2023-11-15',
  },
  {
    title: 'DevOps Engineer',
    description: 'Automate deployment processes',
    expiryDate: '2024-04-30',
  },
  {
    title: 'Mobile App Developer',
    description: 'Develop mobile applications',
    expiryDate: '2023-12-10',
  },
  {
    title: 'AI/ML Engineer',
    description: 'Build machine learning models',
    expiryDate: '2024-02-01',
  },
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createSchemaIfNotExists(DB_CONFIG.DB_SCHEMA);
  const tableExisted = await knex.schema
    .withSchema(DB_CONFIG.DB_SCHEMA)
    .hasTable(TABLE_NAME.JOB);

  if (!tableExisted) {
    await knex.schema
      .withSchema(DB_CONFIG.DB_SCHEMA)
      .createTable(TABLE_NAME.JOB, (table: Knex.CreateTableBuilder) => {
        table.increments('id').primary().notNullable(); // Auto-incrementing primary key
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.date('expiryDate').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
      });

    await knex(TABLE_NAME.JOB)
      .withSchema(DB_CONFIG.DB_SCHEMA)
      .insert(sampleJobs);
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema(DB_CONFIG.DB_SCHEMA)
    .dropTable(TABLE_NAME.JOB);
}

