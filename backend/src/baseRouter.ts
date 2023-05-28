import { Router } from 'express';
import userRouter from './api/user/user.route';

const baseRouter = Router();

baseRouter.use('/user', userRouter);

baseRouter.get('/healthCheck', (req, res) => {
  res.json({
    message: 'Working fine',
    status: 200,
    data: [],
    error: [],
  });
});

export default baseRouter;
