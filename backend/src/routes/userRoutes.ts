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

export default userRouter;
