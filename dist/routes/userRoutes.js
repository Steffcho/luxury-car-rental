"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// userRoutes.ts
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get('/', userControllers_1.getAllUsers);
exports.userRoutes.get('/:id', userControllers_1.getUserById);
exports.userRoutes.post('/', userControllers_1.createUser);
exports.userRoutes.put('/:id', userControllers_1.updateUser);
exports.userRoutes.delete('/:id', userControllers_1.deleteUser);
