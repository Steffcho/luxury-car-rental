import { Router } from 'express';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carControllers';

export const carRoutes = Router();

carRoutes.get('/', getAllCars);
carRoutes.get('/:id', getCarById);
carRoutes.post('/', createCar);
carRoutes.put('/:id', updateCar);
carRoutes.delete('/:id', deleteCar);
