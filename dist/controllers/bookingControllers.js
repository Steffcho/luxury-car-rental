"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = exports.BookingController = void 0;
const database_1 = require("../config/database");
class BookingController {
    createBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, carID, startDate, endDate, totalPrice } = req.body;
            try {
                yield database_1.db.conn.query('INSERT INTO bookings (userID, carID, startDate, endDate, totalPrice) VALUES (?, ?, ?, ?, ?)', [userID, carID, startDate, endDate, totalPrice]);
                res.status(201).json({ message: '✅ Booking created successfully' });
            }
            catch (error) {
                console.error('❌ Error creating booking:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    getAllBookings(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [bookings] = yield database_1.db.conn.query('SELECT * FROM bookings');
                res.json(bookings);
            }
            catch (error) {
                console.error('❌ Error fetching bookings:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    getBookingById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [bookings] = yield database_1.db.conn.query('SELECT * FROM bookings WHERE bookingID = ?', [id]);
                if (bookings.length === 0) {
                    res.status(404).json({ message: 'Booking not found' });
                    return;
                }
                res.json(bookings[0]);
            }
            catch (error) {
                console.error('❌ Error fetching booking:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    updateBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userID, carID, startDate, endDate, totalPrice } = req.body;
            try {
                const [result] = yield database_1.db.conn.query('UPDATE bookings SET userID = ?, carID = ?, startDate = ?, endDate = ?, totalPrice = ? WHERE bookingID = ?', [userID, carID, startDate, endDate, totalPrice, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Booking not found' });
                    return;
                }
                res.json({ message: '✅ Booking updated successfully' });
            }
            catch (error) {
                console.error('❌ Error updating booking:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    deleteBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [result] = yield database_1.db.conn.query('DELETE FROM bookings WHERE bookingID = ?', [id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Booking not found' });
                    return;
                }
                res.json({ message: '🗑 Booking deleted successfully' });
            }
            catch (error) {
                console.error('❌ Error deleting booking:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.BookingController = BookingController;
exports.bookingController = new BookingController();
