"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).send('Token required');
        return;
    }
    jsonwebtoken_1.default.verify(token, 'SECRET', (err) => {
        if (err) {
            res.status(403).send('Invalid token');
            return;
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
