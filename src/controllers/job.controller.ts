import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jobModel } from 'models';

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 5;
  try {
    const jobs = await jobModel.findAll(page, size);
    const total = Number((await jobModel.countAll())[0]?.count) || 0;

    res.json({
      data: jobs,
      total,
      size
    });
  } catch (e) {
    next(e);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id) || 0;
    const job = await jobModel.findById(id);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Entity not found!'
      });
    }
    res.json(job);
  } catch (e) {
    next(e);
  }
};

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const newJob = await jobModel.create(body);

    res.status(StatusCodes.CREATED).json({
      ...body,
      ...newJob[0]
    });
  } catch (e) {
    next(e);
  }
};

export const updateJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id) || 0;
    const body = req.body;

    const changed = await jobModel.updateById(id, body);
    if (!changed) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Entity not found!'
      });
    }
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export const deleteJobById = async (req: Request, res: Response) => {
  const id = Number(req.params.id) || 0;

  const changed = await jobModel.deleteById(id);
  if (!changed) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: 'Entity not found!'
    });
  }
  return res.status(204).end();
};
