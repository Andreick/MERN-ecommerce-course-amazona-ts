import { Router } from 'express';
import Product from '../models/productModel';
import User from '../models/userModel';
import sampleData from '../sampleData';

const seedRouter = Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createProducts = await Product.insertMany(sampleData.products);
  await User.deleteMany({});
  const createUsers = await User.insertMany(sampleData.users);
  res.send({ createProducts, createUsers });
});

export default seedRouter;
