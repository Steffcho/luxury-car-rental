import { Router } from 'express';
import { bookingController, BookingController } from '../controllers/bookingControllers';

export const bookingRoutes = Router();

bookingRoutes.get('/', bookingController.getAllBookings);
bookingRoutes.get('/:id', bookingController.getBookingById);
bookingRoutes.post('/', bookingController.createBooking);
bookingRoutes.put('/:id', bookingController.updateBooking);
bookingRoutes.delete('/:id', bookingController.deleteBooking);
