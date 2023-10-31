import { JSONSchemaType } from 'ajv';

interface Job {
  title: string;
  description: string;
  expiryDate: string;
}

export const createJobSchema: JSONSchemaType<Job> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    expiryDate: { type: 'string', }
  },
  required: ['title', 'description'],
  additionalProperties: false
};

export const updateJobSchema: JSONSchemaType<Job> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    expiryDate: { type: 'string', }
  },
  required: [],
  additionalProperties: false
};
