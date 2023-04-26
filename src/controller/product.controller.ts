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
import { idText } from "typescript";
const jwtsecret = process.env.JWT_SECRET!;


export const createProducts = async (req: any, res: Response) => {
  try {
   // console.log(req);
    const verified = req.user;
   console.log(verified)
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
    const tok = req.cookies['token']
    if(!tok) {
      res.render('login')
    }else{
      verify(tok, jwtsecret!, async(err: any, data: any) => {
        if(err){
          res.render('error', {error: err.message})
        }else{
          
          return res.redirect('/dashboard');
        }

      })
    }
    
  } catch (error) {
    console.log(error);
  }
};



//Update product

export const updateProduct = async (req: Request, res: Response) => {
  try {
   
    const id = req.params.id;
    const { price, countInStock, rating, numReview } = req.body;

    const validationResult = updateProductSchema.validate(req.body, options);

    if (validationResult.error) {
      console.log(validationResult.error.details[0].message)
      const product = await Products.findOne({_id: id}).exec()
    
      res.render("update", {error:validationResult.error.details[0].message, product: product})

    }else{
    
      const prod = await Products.findOne({_id: id})
      const Id = prod?._id
     

      await Products.findOneAndUpdate({_id: Id},{
        price: price,
        countInStock: countInStock,
        rating: rating,
        numReview: numReview,
      });

      res.redirect("/dashboard")

    }
    
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);


    await Products.findByIdAndDelete({_id:id});

    res.redirect("/dashboard")
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting the product");
  }
};



