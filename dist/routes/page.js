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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = require("jsonwebtoken");
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../middlewares/auth");
const product_1 = require("../model/product");
const dotenv = __importStar(require("dotenv"));
const users_1 = require("../model/users");
dotenv.config();
const router = express_1.default.Router();
const jwtsecret = process.env.JWT_SECRET;
//page
router.get("/landing", async (req, res, next) => {
    try {
        const products = await product_1.Products.find().limit(15);
        console.log(products);
        res.render('landing', { products: products });
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/signup", (req, res, next) => {
    res.render("signup");
});
router.get("/login", (req, res, next) => {
    res.render("login");
});
router.get("/dashboard", auth_1.auth, async (req, res) => {
    try {
        const cookie = req.cookies['token'];
        //console.log(cookie)
        if (!cookie) {
            res.render('login');
        }
        else {
            (0, jsonwebtoken_1.verify)(cookie, jwtsecret, async (err, data) => {
                if (err) {
                    res.render('error', { message: err.message });
                }
                else {
                    const { fullname, username, email, password, confirm_password, gender, phone, address, userId } = req.body;
                    const user = await users_1.UserInstance.find({ name: req.body.fullname });
                    const Id = data.userId;
                    console.log(Id);
                    const products = await product_1.Products.find({ userId: Id });
                    // console.log(products)
                    if (products) {
                        res.render('dashboard', { products: products, user });
                    }
                    else {
                        res.render('dashboard', { products: 'No product added yet', user });
                    }
                }
            });
        }
        //console.log(allproduct);
    }
    catch (err) {
        console.log(err);
    }
});
router.get("/logout", user_controller_1.logOut);
exports.default = router;
