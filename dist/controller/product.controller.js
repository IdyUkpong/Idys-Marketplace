"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProducts = void 0;
const product_1 = require("../model/product");
const uttils_1 = require("../utils/uttils");
const console_1 = __importDefault(require("console"));
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;
const createProducts = async (req, res) => {
    try {
        // console.log(req);
        const verified = req.user;
        console_1.default.log(verified);
        const validationResult = uttils_1.createProductSchema.validate(req.body, uttils_1.options);
        if (validationResult.error) {
            return res.render("product", {
                error: validationResult.error.details[0].message,
            });
        }
        const allproduct = new product_1.Products({
            name: req.body.name,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReview: req.body.numReview,
            userId: verified.userId,
        });
        await allproduct.save();
        return res.redirect("/dashboard");
    }
    catch (error) {
        console_1.default.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createProducts = createProducts;
//get all product
const getProducts = async (req, res) => {
    try {
        const tok = req.cookies['token'];
        if (!tok) {
            res.render('login');
        }
        else {
            (0, jsonwebtoken_1.verify)(tok, jwtsecret, async (err, data) => {
                if (err) {
                    res.render('error', { error: err.message });
                }
                else {
                    return res.redirect('/dashboard');
                }
            });
        }
    }
    catch (error) {
        console_1.default.log(error);
    }
};
exports.getProducts = getProducts;
//Update product
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { price, countInStock, rating, numReview } = req.body;
        const validationResult = uttils_1.updateProductSchema.validate(req.body, uttils_1.options);
        if (validationResult.error) {
            console_1.default.log(validationResult.error.details[0].message);
            const product = await product_1.Products.findOne({ _id: id }).exec();
            res.render("update", { error: validationResult.error.details[0].message, product: product });
        }
        else {
            const prod = await product_1.Products.findOne({ _id: id });
            const Id = prod?._id;
            await product_1.Products.findOneAndUpdate({ _id: Id }, {
                price: price,
                countInStock: countInStock,
                rating: rating,
                numReview: numReview,
            });
            res.redirect("/dashboard");
        }
    }
    catch (error) {
        console_1.default.log(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console_1.default.log(id);
        await product_1.Products.findByIdAndDelete({ _id: id });
        res.redirect("/dashboard");
    }
    catch (error) {
        console_1.default.log(error);
        res.status(500).send("An error occurred while deleting the product");
    }
};
exports.deleteProduct = deleteProduct;
