/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Booking = zod.object({
  bookingID: zod.number().optional(),
  customerID: zod.number(),
  shopID: zod.number(),
  barberID: zod.number(),
  serviceID: zod.number(),
  bookingTotalAmount: zod.number(),
  statusID: zod.number(),
});

export type Booking = zod.infer<typeof Booking>;
export const Bookings = db.booking;
