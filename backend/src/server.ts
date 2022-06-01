import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import sampleData from './sampleData';

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

app.get('/api/products', (req, res) => {
  res.send(sampleData.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = sampleData.products.find(
    (product) => product.slug === req.params.slug
  );
  if (!product) {
    res.status(404).send({ message: 'Product Not Found' });
    return;
  }
  res.send(product);
});

app.get('/api/products/:id', (req, res) => {
  const product = sampleData.products.find(
    (product) => product._id === req.params.id
  );
  if (!product) {
    res.status(404).send({ message: 'Product Not Found' });
    return;
  }
  res.send(product);
});

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.info(`server at http://localhost:${port}`);
});
