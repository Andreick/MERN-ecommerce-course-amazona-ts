import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';
import seedRouter from './routes/seedRouter';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRoutes';

dotenv.config();

mongoose
  .connect(process.env.DB_URI ?? '')
  .then(() => {
    console.info('connected to db');
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.info(`server at http://localhost:${port}`);
});
