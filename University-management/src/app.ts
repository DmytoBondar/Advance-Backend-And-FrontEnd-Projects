import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import cors from 'cors';
import router from './app/modules/routes';
import cookieParser from 'cookie-parser';
interface Error {
  name: string;
  message: string;
  status: number;
  stack?: string;
}

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.get('/', () => {
  console.log('working well')
})
app.use('/api/v1', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something Went Wrong';
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    path: req.originalUrl,
    message: errorMessage,
    stack: err.stack,
  });
  next();
});
export default app
