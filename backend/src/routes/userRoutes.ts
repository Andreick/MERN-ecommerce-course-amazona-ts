import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User, { UserPayload } from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils';

const userRouter = Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const { _id, email, isAdmin, name } = user;
        const userPayload: UserPayload = { _id, email, isAdmin, name };
        res.send({ ...userPayload, token: generateToken(userPayload) });
        return;
      }
    }
    res.status(401).send({ message: 'invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    const { _id, email, isAdmin, name } = user;
    const userPayload: UserPayload = { _id, email, isAdmin, name };
    res.send({ ...userPayload, token: generateToken(userPayload) });
  })
);

export default userRouter;
