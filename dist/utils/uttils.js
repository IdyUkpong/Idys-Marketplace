"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = exports.loginUserSchema = exports.options = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().trim().lowercase().required(),
    username: joi_1.default.string().trim().lowercase().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default
        .string()
        .regex(/^[a-zA-Z0-9]{6,18}$/)
        .required(),
    confirm_password: joi_1.default
        .any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
    gender: joi_1.default.string().trim().lowercase().required(),
    phone: joi_1.default.number().required(),
    address: joi_1.default.string().trim().lowercase().required(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
};
//login
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().required(),
    password: joi_1.default
        .string()
        .regex(/^[a-zA-Z0-9]{6,18}$/)
        .trim()
        .required()
});
//create
exports.createProductSchema = joi_1.default.object().keys({
    name: joi_1.default.string().lowercase().required(),
    image: joi_1.default.string().lowercase().required(),
    brand: joi_1.default.string().lowercase().required(),
    category: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase().required(),
    price: joi_1.default.number().required(),
    countInStock: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
    numReview: joi_1.default.number().required(),
});
//update
exports.updateProductSchema = joi_1.default.object().keys({
    price: joi_1.default.number(),
    countInStock: joi_1.default.number(),
    rating: joi_1.default.number(),
    numReview: joi_1.default.number(),
});
