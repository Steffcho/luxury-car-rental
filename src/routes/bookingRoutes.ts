import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from '../controllers/bookingControllers';

export const bookingRoutes = Router();

bookingRoutes.get('/', getAllBookings);
bookingRoutes.get('/:id', getBookingById);
bookingRoutes.post('/', createBooking);
bookingRoutes.put('/:id', updateBooking);
bookingRoutes.delete('/:id', deleteBooking);
