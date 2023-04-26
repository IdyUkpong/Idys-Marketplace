import { Request, Response } from "express";
import { UserInstance } from "../model/users";
import { registerUserSchema, options, loginUserSchema } from "../utils/uttils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

export const signupUser = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      confirm_password,
      gender,
      phone,
      address,
    } = req.body;

    const validationResult = registerUserSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(200).json({
        error: validationResult.error.details[0].message,
      });
    }

    const passwordHash = await bcrypt.hash(password, 7);
    const user = await UserInstance.findOne({
      email: email,
    });

    if (!user) {
      const newUser = await new UserInstance({
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
   
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// //login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserInstance.findOne({
      email,
    });

    const { _id } = existingUser as unknown as { [key: string]: string };

  

    const token = jwt.sign({ userId: _id }, jwtsecret!);
  

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const cookies = req.cookies["token"];
  

    if (cookies) {
      const validationResult = loginUserSchema.validate(req.body, options);

      if (validationResult.error) {
        return res.render("login", {
          error: validationResult.error.details[0].message,
        });
     
      }

     
      bcrypt.compare(password, existingUser?.password || "").then((match) => {
        if (match) {
          return res.redirect("/dashboard");
      
        } else {
          const err = "Invalid Email/Password";
          return res.render("login", { error: err });
       
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).render("login", { error: "Internal Server Error" });
  }
};

//get userandProduct
export const getUserAndProduct = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await UserInstance.find().populate("products");
    res.status(200).send({
      msg: "All Products retrieved successfully",
      count: getAllUsers.length,
      users: getAllUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.redirect("/");
};
