//import { Sequelize } from "sequelize";
import mongoose, {Schema } from "mongoose";


interface ProductsAtributes{
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: Number;
    countInStock: Number;
    rating: Number;
  numReview: Number;
  userId: string;
    
}

 export const ProductsSchema = new mongoose.Schema<ProductsAtributes>({
   userId: Schema.Types.ObjectId,
   name: String,
   image: String,
   brand: String,
   category: String,
   description: String,
   price: Number,
   countInStock: Number,
   rating: Number,
   numReview: Number,
 },{
  toJSON:{
    transform(user, ret){
      ret.id = ret._id,
      delete ret._id,
      delete ret.password,
      delete ret._v
    }
  }
 });

export const Products = mongoose.model("Products",ProductsSchema)