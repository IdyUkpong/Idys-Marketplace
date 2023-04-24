"use strict";
// import { Request, Response, NextFunction } from "express";
// import { verify, sign } from "jsonwebtoken";
// import { existsSync, readFileSync, writeFile } from "fs";
// export const signAuth = (name: string, id:string) => {
//     const token = sign({
//         username: name,
//         id: id
//     }, process.env.JWT_SECRET!
//     );
//     return token
// }
// export const verifier = (req:any, res: any, next: any) => {
//     const token = req.cookies['token']
//     if (!token) {
//         req.authenticated = true
//         req.status = 403
//         res.render('login', {error: 'Please login as a user'})
//     } else {
//         let validator = verify(token, process.env.JWT_SECRET!)
//         if (validator) {
//             return next()
//         } else {
//             req.status = 403
//             res.render('login', {error: 'Invalid token'})
//         }
//     }
// }
// export const saveFile = (file: any) => {
//   const database = JSON.stringify(file, null, 2);
//   writeFile("database.json", database, (err) => {
//     if (err) {
//       return err;
//     } else {
//         console.log("File saved")
//     }
//   });
// };
// export const getFile = (file: any) => {
//     const exist = existsSync(file)
//     if (exist) {
//         const data = readFileSync(file, "utf-8");
//         if (data === "") {
//           console.log("there was no file to read");
//         } else {
//           let database = JSON.parse(data);
//           return database;
//         }
//     } else {
//         console.log("there was no file to read");
//     }
// }
// interface product {
//   name: string;
//   image: string;
//   brand: string;
//   category: string;
//   description: string;
//   price: number;
//   countInStock: number;
//   rating: number;
//   numReviews: number;
// }
// export const product: product = {
//     name: '',
//     image: '',
//     brand: '',
//     category: '',
//     description: '',
//     price:0,
//     countInStock:0,
//     rating:0,
//     numReviews: 0
// }
// interface user {
//     find(arg0: { email: any; }): unknown;
//     findOne(arg0: { email: any; }): unknown;
//     email: string,
//     id: string
// }
// // export const user: user = {
// //     email: '',
// //     id: '',
// //     findOne: function (arg0: { email: any; }): unknown {
// //         throw new Error("Function not implemented.");
// //     }
// // }
// // interface database {
// //     user: user,
// //     products: product[]
// // }
// // export const database: database = {
// //     user: user,
// //     products: [product]
// // }
