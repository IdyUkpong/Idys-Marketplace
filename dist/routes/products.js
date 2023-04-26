"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const auth_1 = require("../middlewares/auth");
const product_1 = require("../model/product");
const router = express_1.default.Router();
/* GET home page. */
router.post("/post-products", auth_1.auth, product_controller_1.createProducts);
router.get("/post-products", auth_1.auth, product_controller_1.createProducts);
router.get("/get-products", auth_1.auth, product_controller_1.getProducts);
router.post("/update-products/:id", auth_1.auth, product_controller_1.updateProduct);
router.get("/delete-products/:id", auth_1.auth, product_controller_1.deleteProduct);
router.get('/update-products/:id', auth_1.auth, async (req, res, next) => {
    const Id = req.params.id;
    const product = await product_1.Products.findOne({ _id: Id }).exec();
    const prod = product?.id;
    if (prod === Id) {
        res.render('update', { product: product, error: '' });
    }
});
exports.default = router;
