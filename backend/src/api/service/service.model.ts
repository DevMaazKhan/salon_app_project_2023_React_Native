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

export type Service = zod.infer<typeof Service>;
export const Services = db.service;
