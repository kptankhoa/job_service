import express, { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { PORT } from 'config';
import routes from 'routes';
import { authenticate } from 'middlewares';

const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Job APIs'
  });
});

app.use('/jobs', authenticate, routes.jobRouter);

app.use((_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: 'Endpoint not found'
  });
});


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
