import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { getFilesWithKeyword } from './utils/getFilesWithKeyword';
import 'dotenv/config'
import logger from './utils/logger';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
// Mainly since app is deployed on heroku while front is deployed on vercel
app.use(cors());

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

getFilesWithKeyword('router', __dirname + '/app').forEach((file: string) => {
  const { router } = require(file);
  app.use('/', router);
})
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  })
  return res.status(500).json({ message: 'Internal server Error' });
});

export default app;
