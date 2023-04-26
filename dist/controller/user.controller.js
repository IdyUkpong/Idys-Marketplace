"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.getUserAndProduct = exports.loginUser = exports.signupUser = void 0;
const users_1 = require("../model/users");
const uttils_1 = require("../utils/uttils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwtsecret = process.env.JWT_SECRET;
const signupUser = async (req, res) => {
    try {
        const { fullname, username, email, password, confirm_password, gender, phone, address, } = req.body;
        const validationResult = uttils_1.registerUserSchema.validate(req.body, uttils_1.options);
        if (validationResult.error) {
            return res.status(200).json({
                error: validationResult.error.details[0].message,
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 7);
        const user = await users_1.UserInstance.findOne({
            email: email,
        });
        if (!user) {
            const newUser = await new users_1.UserInstance({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: passwordHash,
                gender: req.body.gender,
                phone: req.body.phone,
                address: req.body.address,
            });
            await newUser.save();
            return res.render("login");
        }
        return res.render("signup", { error: "Email already exists" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.signupUser = signupUser;
// //login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await users_1.UserInstance.findOne({
            email,
        });
        const { _id } = existingUser;
        const token = jsonwebtoken_1.default.sign({ userId: _id }, jwtsecret);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        const cookies = req.cookies["token"];
        if (cookies) {
            const validationResult = uttils_1.loginUserSchema.validate(req.body, uttils_1.options);
            if (validationResult.error) {
                return res.render("login", {
                    error: validationResult.error.details[0].message,
                });
            }
            bcryptjs_1.default.compare(password, existingUser?.password || "").then((match) => {
                if (match) {
                    return res.redirect("/dashboard");
                }
                else {
                    const err = "Invalid Email/Password";
                    return res.render("login", { error: err });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).render("login", { error: "Internal Server Error" });
    }
};
exports.loginUser = loginUser;
//get userandProduct
const getUserAndProduct = async (req, res) => {
    try {
        const getAllUsers = await users_1.UserInstance.find().populate("products");
        res.status(200).send({
            msg: "All Products retrieved successfully",
            count: getAllUsers.length,
            users: getAllUsers,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
exports.getUserAndProduct = getUserAndProduct;
const logOut = async (req, res) => {
    res.clearCookie("token");
    return res.redirect("/");
};
exports.logOut = logOut;
