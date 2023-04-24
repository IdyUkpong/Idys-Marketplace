"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
/* GET home page. */
router.post("/post-products", auth_1.auth, product_controller_1.createProducts);
router.get("/post-products", auth_1.auth, product_controller_1.createProducts);
router.get("/get-products", auth_1.auth, product_controller_1.getProducts);
//router.patch("/update-products/:id", auth, updateProduct);
router.post("/update-products/:id", auth_1.auth, product_controller_1.updateProduct);
router.get("/delete-products/:id", auth_1.auth, product_controller_1.deleteProduct);
router.get('/post-products', ((req, res, next) => {
    res.render('product');
}));
router.post('/post-products', ((req, res, next) => {
    res.render('product');
}));
router.get('/update-products', ((req, res, next) => {
    res.render('update');
}));
router.post('/update-products', ((req, res, next) => {
    res.render('update');
}));
exports.default = router;
