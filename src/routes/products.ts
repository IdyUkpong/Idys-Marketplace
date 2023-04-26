import { exec } from "child_process";
import express, { NextFunction } from "express";
import { Request, Response } from "express";
import {
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import {auth} from "../middlewares/auth"
import { Products } from "../model/product";
const router = express.Router();


/* GET home page. */
router.post("/post-products", auth, createProducts);
router.get("/post-products", auth, createProducts);
router.get("/get-products", auth, getProducts);

router.post("/update-products/:id", auth, updateProduct);
router.get("/delete-products/:id", auth, deleteProduct);


router.get('/update-products/:id', auth, async(req: Request, res: Response, next: NextFunction) => {
  const Id = req.params.id
  const product = await Products.findOne({_id: Id}).exec()
  const prod: any = product?.id 
  if(prod === Id){
    res.render('update', {product: product, error: ''})
  }
  
})






export default router;
