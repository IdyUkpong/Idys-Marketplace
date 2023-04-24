import express, { NextFunction } from "express";
import { Request, Response } from "express";
import {
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import {auth} from "../middlewares/auth"
const router = express.Router();


/* GET home page. */
router.post("/post-products", auth, createProducts);
router.get("/post-products", auth, createProducts);
router.get("/get-products", auth, getProducts);
router.post("/update-products/:id", auth, updateProduct);
router.get("/delete-products/:id", auth, deleteProduct);

router.get('/post-products',((req: Request, res: Response, next: NextFunction) => {
  res.render('product')
}))
router.post('/post-products',((req: Request, res: Response, next: NextFunction) => {
  res.render('product')
}))

router.get('/update-products',((req: Request, res: Response, next: NextFunction) => {
  res.render('update')
}))
router.post('/update-products',((req: Request, res: Response, next: NextFunction) => {
  res.render('update')
}))






export default router;
