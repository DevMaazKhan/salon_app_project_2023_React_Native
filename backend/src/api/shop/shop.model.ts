/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Shop = zod.object({
  shopID: zod.number().optional(),
  shopName: zod.string(),
  userID: zod.number(),
});

export type Shop = zod.infer<typeof Shop>;
export const Shops = db.shop;
