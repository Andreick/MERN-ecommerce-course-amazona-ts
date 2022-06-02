import { Router } from 'express';
import Product from '../models/productModel';
import sampleData from '../sampleData';

const seedRouter = Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createProducts = await Product.insertMany(sampleData.products);
  res.send({ createProducts });
});

export default seedRouter;
