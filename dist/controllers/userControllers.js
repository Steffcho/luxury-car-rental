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
exports.userController = exports.UserController = void 0;
const database_1 = require("../config/database");
class UserController {
    // [CREATE] POST /api/users
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email } = req.body;
            try {
                yield database_1.db.conn.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
                res.status(201).json({ message: '✅ User created successfully' });
            }
            catch (error) {
                console.error('❌ Error creating user:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    // [READ ALL] GET /api/users
    getAllUsers(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [users] = yield database_1.db.conn.query('SELECT * FROM users');
                res.json(users);
            }
            catch (error) {
                console.error('❌ Error fetching users:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    // [READ ONE] GET /api/users/:id
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    // [UPDATE] PUT /api/users/:id
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    // [DELETE] DELETE /api/users/:id
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
