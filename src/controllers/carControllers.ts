import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Car {
  carId: number;
  carBrand: string;
  carModel: string;
  year: number;
  pricePerDay: number;
}

// [CREATE] POST
export const createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { carBrand, carModel, year, pricePerDay } = req.body;
  try {
    await db.conn.query(
      'INSERT INTO cars (carBrand, carModel, year, pricePerDay) VALUES (?, ?, ?, ?)',
      [carBrand, carModel, year, pricePerDay]
    );
    res.status(201).json({ message: '✅ Car added successfully' });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 👁 [READ ALL] GET /api/cars
export const getAllCars = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [cars] = await db.conn.query<(Car & RowDataPacket)[]>('SELECT * FROM cars');
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 👁 [READ ONE] GET /api/cars/:id
export const getCarById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const [cars] = await db.conn.query<(Car & RowDataPacket)[]>(
      'SELECT * FROM cars WHERE carId = ?',
      [id]
    );

    if (cars.length === 0) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    res.json(cars[0]);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// [UPDATE] PUT
export const updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { carBrand, carModel, year, pricePerDay } = req.body;
  try {
    const [result] = await db.conn.query<ResultSetHeader>(
      'UPDATE cars SET carBrand = ?, carModel = ?, year = ?, pricePerDay = ? WHERE carId = ?',
      [carBrand, carModel, year, pricePerDay, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    res.json({ message: 'Car updated successfully' });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// [DELETE] DELETE
export const deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const [result] = await db.conn.query<ResultSetHeader>(
      'DELETE FROM cars WHERE carId = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};