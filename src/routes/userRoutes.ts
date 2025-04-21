import { Router } from 'express';
import { userController } from '../controllers/userControllers';

export const userRoutes = Router();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);
