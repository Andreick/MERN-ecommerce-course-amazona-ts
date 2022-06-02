import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import seedRouter from './routes/seedRouter';
import productRouter from './routes/ProductRouter';

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

app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.info(`server at http://localhost:${port}`);
});
