import { Router } from 'express';
import userRouter from './api/user/user.route';
import serviceRouter from './api/service/service.route';

const baseRouter = Router();

baseRouter.use('/user', userRouter);
baseRouter.use('/service', serviceRouter);

baseRouter.get('/healthCheck', (req, res) => {
  res.json({
    message: 'Working fine',
    status: 200,
    data: [],
    error: [],
  });
});

export default baseRouter;
