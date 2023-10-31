import { NextFunction, Request, Response } from 'express';
import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

export const validate = (schema: JSONSchemaType<any>) => (req: Request, res: Response, next: NextFunction) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json(validate.errors);
  }

  next();
};
