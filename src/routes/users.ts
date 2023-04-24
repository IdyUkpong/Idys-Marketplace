import express from "express";
import { Request, Response } from "express";
//import { getUserAndProduct } from "express";
import {auth} from "../middlewares/auth"

import {
  signupUser,
 loginUser,
  getUserAndProduct,
 } from "../controller/user.controller";


const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response) {
  res.send("respond with a resource");
});


router.post("/signup", signupUser);
router.post("/login",loginUser);
router.get("/getalluser", getUserAndProduct);



export default router;
