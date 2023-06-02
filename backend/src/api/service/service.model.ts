/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Service = zod.object({
  serviceID: zod.number().optional(),
  serviceName: zod.string(),
  serviceImageUrl: zod.string(),
  servicePrice: zod.number(),
  serviceDurationInMinutes: zod.number(),
  serviceDiscountPrice: zod.number(),
  hasDiscount: zod.boolean(),
  shopID: zod.number(),
});

export const CreateServiceInput = zod.object({
  serviceName: zod.string(),
  serviceImageUrl: zod.string(),
  servicePrice: zod.number(),
  serviceDurationInMinutes: zod.number(),
  serviceDiscountPrice: zod.number(),
  shopID: zod.number(),
});

export const UpdateServiceInput = zod.object({
  serviceName: zod.string(),
  serviceImageUrl: zod.string(),
  servicePrice: zod.number(),
  serviceDurationInMinutes: zod.number(),
  serviceDiscountPrice: zod.number(),
});

export const GetByIDInput = zod.object({
  serviceID: zod.number(),
});
export const UpdateServiceInputParams = zod.object({
  serviceID: zod.number(),
});
export const DeleteServiceInputParams = zod.object({
  serviceID: zod.number(),
});

export type Service = zod.infer<typeof Service>;
export type CreateServiceInput = zod.infer<typeof CreateServiceInput>;
export type UpdateServiceInput = zod.infer<typeof UpdateServiceInput>;
export type GetByIDInput = zod.infer<typeof GetByIDInput>;
export type UpdateServiceInputParams = zod.infer<
  typeof UpdateServiceInputParams
>;
export type DeleteServiceInputParams = zod.infer<
  typeof DeleteServiceInputParams
>;
export const Services = db.service;
