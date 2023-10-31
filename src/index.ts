import express, { NextFunction, Request, Response } from 'express';
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

app.use('/jobs', authenticate, routes.jobRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});


// handle error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
