import { Router } from 'express';
import userController from './user.controller';

const userRouter = Router();

userRouter.route('/register').post(userController.create);
userRouter.route('/login').post(userController.login);

export default userRouter;
