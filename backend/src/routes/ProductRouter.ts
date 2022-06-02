import { Router } from 'express';
import Product from '../models/productModel';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404).send({ message: 'Product Not Found' });
    return;
  }
  res.send(product);
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send({ message: 'Product Not Found' });
    return;
  }
  res.send(product);
});

export default productRouter;
