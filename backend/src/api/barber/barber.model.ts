/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Barber = zod.object({
  barberID: zod.number().optional(),
  barberName: zod.string(),
  totalExperienceInYear: zod.number(),
  userID: zod.number(),
});

export type Barber = zod.infer<typeof Barber>;
export const Barbers = db.barber;
