import mongoose, { Model, Document } from "mongoose";
import { Products, ProductsSchema } from "./product";

interface User extends Document {
  _id:string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
  userId: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
 
  {
    toJSON:{
      transform(doc, ret){
        ret.userId = ret._id,
        delete ret._id,
        delete ret._v;
      }
    }

  },
 
);

export const UserInstance = mongoose.model<User>("User", userSchema);


