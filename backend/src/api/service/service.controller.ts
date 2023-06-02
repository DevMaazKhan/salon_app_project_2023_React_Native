import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import {
  CreateServiceInput,
  DeleteServiceInputParams,
  GetByIDInput,
  Service,
  UpdateServiceInput,
  UpdateServiceInputParams,
} from './service.model';
import ErrorResponse from '../../util/createError';
import ServiceHandler from './service.handler';
import config from '../../util/config';

class ServiceController {
  static getAll = async (
    req: Request<void, SuccessResponse<Service[]>>,
    res: Response<SuccessResponse<Service[]>>,
    next: NextFunction
  ) => {
    try {
      const services = await ServiceHandler.getAll();

      res.send(createSuccessResponse(services, 'Services found Successfully'));
    } catch (error) {
      next(error);
    }
  };

  static getByID = async (
    req: Request<GetByIDInput, SuccessResponse<Service>>,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      await GetByIDInput.parseAsync({
        serviceID: +req.params.serviceID,
      });

      const { serviceID } = req.params;
      const service = await ServiceHandler.getByID(serviceID);

      if (service) {
        res.send(createSuccessResponse(service, 'Service found successfully'));
      } else {
        next(
          new ErrorResponse(`Service with the ID ${serviceID} not found`, 400)
        );
      }
    } catch (error) {
      next(error);
    }
  };

  static create = async (
    req: Request<any, SuccessResponse<Service>, CreateServiceInput>,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      fs.write(
        config.APP_HOME + '/images/out.png',
        req.body.image,
        'base64',
        function (err) {
          if (err) console.log(err);
        }
      );
      if (!req.file) {
        return next(new ErrorResponse(`Service Image is required`, 400));
      }

      console.log(req.file);

      const service = req.body;
      const newService = await ServiceHandler.create({
        serviceDiscountPrice: service.serviceDiscountPrice,
        serviceDurationInMinutes: service.serviceDurationInMinutes,
        serviceImageUrl: service.serviceImageUrl,
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
        shopID: service.shopID,
      });

      if (!newService) {
        return next(
          new ErrorResponse(`Service can not be created, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(newService, 'Service created successfully')
      );
    } catch (error) {
      console.log(error);

      next(error);
    }

    return next();
  };

  static update = async (
    req: Request<
      UpdateServiceInputParams,
      SuccessResponse<Service>,
      UpdateServiceInput
    >,
    res: Response<SuccessResponse<Service>>,
    next: NextFunction
  ) => {
    try {
      await UpdateServiceInputParams.parseAsync({
        serviceID: +req.params.serviceID,
      });

      const service = req.body;
      const updatedService = await ServiceHandler.update(
        {
          serviceDiscountPrice: service.serviceDiscountPrice,
          serviceDurationInMinutes: service.serviceDurationInMinutes,
          serviceImageUrl: service.serviceImageUrl,
          serviceName: service.serviceName,
          servicePrice: service.servicePrice,
        },
        req.params.serviceID
      );

      if (!updatedService) {
        return next(
          new ErrorResponse(`Service can not be created, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(updatedService, 'Service updated successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static delete = async (
    req: Request<DeleteServiceInputParams, SuccessResponse<{}>>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      await DeleteServiceInputParams.parseAsync({
        serviceID: +req.params.serviceID,
      });

      const isDeleted = await ServiceHandler.delete(+req.params.serviceID);

      if (isDeleted) {
        res.send(createSuccessResponse({}, 'Service deleted successfully'));
      } else {
        return next(new ErrorResponse(`Service can not be deleted`, 400));
      }
    } catch (error) {
      return next(error);
    }

    return next();
  };
}

export default ServiceController;
