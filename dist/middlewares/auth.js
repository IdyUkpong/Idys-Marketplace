"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
const auth = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        req.authenticated = true;
        req.status = 403;
        return res.render('login', { error: 'Please login as a user' });
        // return  res.status(400).json( {error: 'Please login as a user'})
    }
    else {
        let validator = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (validator) {
            req.user = validator;
            return next();
        }
        else {
            req.status = 403;
            return res.render('login', { error: 'Invalid token' });
            //return res.status(400).json( {error: 'Invalid token'})
        }
    }
};
exports.auth = auth;
