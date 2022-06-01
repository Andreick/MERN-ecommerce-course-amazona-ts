import express from 'express';
import sampleData from './sampleData';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(sampleData.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = sampleData.products.find(
    (product) => product.slug === req.params.slug
  );
  if (!product) {
    res.send(404).send({ message: 'Product Not Found' });
    return;
  }
  res.send(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.info(`server at http://localhost:${port}`);
});
