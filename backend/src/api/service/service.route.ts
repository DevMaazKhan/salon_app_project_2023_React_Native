import { Router } from 'express';
import serviceController from './service.controller';
import fileUpload from '../../util/fileUpload';

const serviceRouter = Router();

serviceRouter.post('/', fileUpload.single('image'), serviceController.create);

serviceRouter.route('/').get(serviceController.getAll);

serviceRouter
  .route('/:serviceID')
  .get(serviceController.getByID)
  .patch(serviceController.update)
  .delete(serviceController.delete);

export default serviceRouter;
