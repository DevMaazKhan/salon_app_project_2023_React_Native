/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Customer = zod.object({
  customerID: zod.number().optional(),
  customerName: zod.string(),
  userID: zod.number(),
});

export type Customer = zod.infer<typeof Customer>;
export const Customers = db.customer;
