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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const database_1 = require("../config/database");
// ▶️ [CREATE] POST /api/users
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    console.log('📥 New user payload:', { username, email }); // 👈
    try {
        yield database_1.db.conn.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
        res.status(201).json({ message: '✅ User created successfully' });
    }
    catch (error) {
        console.error('❌ Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createUser = createUser;
// 👁 [READ ALL] GET /api/users
const getAllUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [users] = yield database_1.db.conn.query('SELECT * FROM users');
        res.json(users);
    }
    catch (error) {
        console.error('❌ Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllUsers = getAllUsers;
// 👁 [READ ONE] GET /api/users/:id
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [users] = yield database_1.db.conn.query('SELECT * FROM users WHERE userID = ?', [id]);
        if (users.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(users[0]);
    }
    catch (error) {
        console.error('❌ Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserById = getUserById;
// 🔧 [UPDATE] PUT /api/users/:id
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const [result] = yield database_1.db.conn.query('UPDATE users SET username = ?, email = ? WHERE userID = ?', [username, email, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: '✅ User updated successfully' });
    }
    catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateUser = updateUser;
// ❌ [DELETE] DELETE /api/users/:id
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield database_1.db.conn.query('DELETE FROM users WHERE userID = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: '🗑 User deleted successfully' });
    }
    catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteUser = deleteUser;
