import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Booking {
  bookingID: number;
  userID: number;
  carID: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

// ▶️ [CREATE] POST /api/bookings
export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userID, carID, startDate, endDate, totalPrice } = req.body;
  try {
    await db.conn.query(
      'INSERT INTO bookings (userID, carID, startDate, endDate, totalPrice) VALUES (?, ?, ?, ?, ?)',
      [userID, carID, startDate, endDate, totalPrice]
    );
    res.status(201).json({ message: '✅ Booking created successfully' });
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// [READ ALL] GET
export const getAllBookings = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [bookings] = await db.conn.query<(Booking & RowDataPacket)[]>('SELECT * FROM bookings');
    res.json(bookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// [READ ONE] GET
export const getBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const [bookings] = await db.conn.query<(Booking & RowDataPacket)[]>(
      'SELECT * FROM bookings WHERE bookingID = ?',
      [id]
    );

    if (bookings.length === 0) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.json(bookings[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// [UPDATE] PUT
export const updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { userID, carID, startDate, endDate, totalPrice } = req.body;
  try {
    const [result] = await db.conn.query<ResultSetHeader>(
      'UPDATE bookings SET userID = ?, carID = ?, startDate = ?, endDate = ?, totalPrice = ? WHERE bookingID = ?',
      [userID, carID, startDate, endDate, totalPrice, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.json({ message: '✅ Booking updated successfully' });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// [DELETE] DELETE
export const deleteBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const [result] = await db.conn.query<ResultSetHeader>(
      'DELETE FROM bookings WHERE bookingID = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    res.json({ message: '🗑 Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};