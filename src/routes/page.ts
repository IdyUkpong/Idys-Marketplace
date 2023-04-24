import express, { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { logOut } from "../controller/user.controller";
import { auth } from "../middlewares/auth";
import { Products } from "../model/product";
import * as dotenv from "dotenv";
import { UserInstance } from "../model/users";

dotenv.config();

const router = express.Router();
const jwtsecret = process.env.JWT_SECRET!;

//page

router.get(
  "/landing",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Products.find().limit(15);
      console.log(products);

      res.render("landing", { products: products });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/signup", (req: Request, res: Response, next: NextFunction) => {
  res.render("signup");
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("login");
});

router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const cookie = req.cookies["token"];
    if (!cookie) {
      res.render("login");
    } else {
      verify(cookie, jwtsecret, async (err: any, data: any) => {
        if (err) {
          res.render("error", { message: err.message });
        } else {
          const {
            fullname,
            username,
            email,
            password,
            confirm_password,
            gender,
            phone,
            address,
            userId,
          } = req.body;
          const user = await UserInstance.find({ name: req.body.fullname });
          const Id = data.userId;
          console.log(Id);
          const products = await Products.find({ userId: Id });

          if (products) {
            res.render("dashboard", { products: products, user });
          } else {
            res.render("dashboard", { products: "No product added yet", user });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", logOut);

export default router;
