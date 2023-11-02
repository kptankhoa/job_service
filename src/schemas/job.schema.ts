import { JSONSchemaType } from 'ajv';
import { ISO_DATE_PATTERN } from 'constant';

interface Job {
  title: string;
  description: string;
  expiryDate: string;
}

export const createJobSchema: JSONSchemaType<Job> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    expiryDate: { type: 'string', pattern: ISO_DATE_PATTERN }
  },
  required: ['title', 'description', 'expiryDate'],
  additionalProperties: false
};

export const updateJobSchema: JSONSchemaType<Job> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    expiryDate: { type: 'string', pattern: ISO_DATE_PATTERN }
  },
  required: [],
  additionalProperties: false
};
