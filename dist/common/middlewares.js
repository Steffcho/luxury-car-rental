"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentDateOfExecution = void 0;
const currentDateOfExecution = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
exports.currentDateOfExecution = currentDateOfExecution;
