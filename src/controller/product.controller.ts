import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Products } from "../model/product";

import {
  createProductSchema,
  options,
  updateProductSchema,
} from "../utils/uttils";

import console from "console";

import { verify } from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET!;

export const createProducts = async (req: any, res: Response) => {
  try {
    // console.log(req);
    const verified = req.user;

    const validationResult = createProductSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.render("product", {
        error: validationResult.error.details[0].message,
      });
    }
    const allproduct = new Products({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all product
export const getProducts = async (req: Request, res: Response) => {
  try {
    const tok = req.cookies["token"];
    if (!tok) {
      res.render("login");
    } else {
      verify(tok, jwtsecret!, async (err: any, data: any) => {
        if (err) {
          res.render("error", { error: err.message });
        } else {
          return res.redirect("/dashboard");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Put product

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { price, countInStock, rating, numReview } = req.body;

    const validationResult = updateProductSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.redirect("/dashboard");
    }

    const updateProduct = await Products.findById(id);

    if (!updateProduct) {
      return res.render("update");
    }

    const foundProduct = await updateProduct?.updateOne({
      price,
      countInStock,
      rating,
      numReview,
    });
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);

    const deletedProduct = await Products.findByIdAndDelete({ _id: id });
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the product");
  }
};
