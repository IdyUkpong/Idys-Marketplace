"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import product from "../routes/product";
// export const addProductControllerGet = ((req: Request, res: Response) => { 
//     res.render('product')
// })
// export const addProductControllerPost = async(req: Request, res: Response) => {
//     const {
//         name,
//         description,
//         price,
//         image,
//         category,
//         numReviews,
//         rating,
//         brand,
//         countInStock,
//     } = req.body
//     let token = req.cookies['token']
//     if (!token) {
//         res.render('login', {error: "Please log in back to your page"})
//     } else {
//         verify(token, process.env.JWT_SECRET!, async(err: any, getId: any) => {
//             if (err) {
//                 res.render('login', {error: "Please log in back to your page"})
//             } else {
//                 let userID = getId.id
//                 let userEmail = getId.username
//                 const save = await ProductsSchema.create({
//                   id: uuidv4(),
//                   name: name,
//                   image: image,
//                   category: category,
//                   description: description,
//                   price: price,
//                   brand: brand,
//                   countInStock: countInStock,
//                   rating: rating,
//                   numReview: numReviews,
//                 });
//                 const existFile = existsSync('database.json')
//                 product.name = name;
//                 product.description = description;
//                 product.price = price;
//                 product.image = image;
//                 product.category = category;
//                 product.numReviews = numReviews;
//                 product.rating = rating;
//                 product.brand = brand;
//                 product.countInStock = countInStock;
//                 if (!existFile ) {
//                     user.email = userEmail
//                     user.id = userID
//                     database.user = user
//                     database.products = [product]
//                     let storage = []
//                     storage.push(database)
//                     const newStorage = JSON.stringify(storage, null, 2)
//                     writeFile('database.json', newStorage, err => {
//                         if (err) {
//                             res.render('dashboard')
//                         } else {
//                             console.log('File saved successfully')
//                         }
//                     })
//                     res.redirect('/dashboard')
//                 } else {
//                     let userID = getId.id;
//                     let userEmail = getId.username;
//                     const data = getFile('database.json')
//                     const userData = data.filter((user: any) => { return user.user.email === userEmail })
//                     if (userData.length > 0 && userData[0].user !== "") {
//                         const products = userData[0].products;
//                         if (products[0].name === "") {
//                           products[0].name = name;
//                           products[0].description = description;
//                           products[0].price = price;
//                           products[0].image = image;
//                           products[0].category = category;
//                           products[0].numReviews = numReviews;
//                           products[0].rating = rating;
//                           products[0].brand = brand;
//                           products[0].countInStock = countInStock;
//                           userData[0].products = products;
//                           const place = data.indexOf(userData[0]);
//                           data[place] = userData[0];
//                           saveFile(data);
//                           res.redirect("/dashboard");
//                         } else if (products[0].name !== "") {
//                           console.log(products);
//                           products.push(product);
//                           userData[0].products = products;
//                           const place = data.indexOf(userData[0]);
//                           data[place] = userData[0];
//                           saveFile(data);
//                           res.redirect("/dashboard");
//                         }
//                     } else if (userData.length < 1) {
//                         user.email = userEmail
//                         user.id = userID
//                         database.user = user
//                         database.products = [product]
//                         data.push(database)
//                         const newStorage = JSON.stringify(data, null, 2)
//                         writeFile('database.json', newStorage, err => {
//                             if (err) {
//                                 res.render('dashboard')
//                             } else {
//                                 console.log('File saved successfully')
//                             }
//                         })
//                         res.redirect('/dashboard')
//                     }
//                 }
//             }
//         })
//     }
// };
// function iduuid(): string {
//     throw new Error("Function not implemented.");
// }
// export const upgradeProductGet = (req: Request, res: Response) => {
//     let token = req.cookies["token"];
//     let name = req.params.name
//     if (!token) {
//         res.redirect("/login");
//     } else {
//         verify(token, process.env.JWT_SECRET!, (err: any, data: any) => {
//             if (err) {
//                 res.redirect("/login");
//             } else {
//                 let existence = existsSync("database.json");
//                 if (!existence) {
//                     const message = "No products available";
//                     const user = "";
//                     res.render("dashboard", { newMessage: message, user: user });
//                 } else {
//                     const database = getFile("database.json");
//                     const userEmail = data.username;
//                     const id = data.id;
//                     const user = database.filter((user: any) => {
//                         return user.user.email === userEmail;
//                     });
//                     const prod = user[0].products
//                     const products = prod.filter((product: any) => { return product.name.trim() === name });
//                     const users = user[0].user;
//                     res.render("update", {product: products[0]});
//                 }
//             }
//         });
//     }
// };
// export const upgradeProductPost = (req: Request, res: Response) => {
//     const {
//         name,
//         description,
//         image,
//         category,
//         brand,
//         price,
//         countInStock,
//         numReviews,
//         rating,
//     } = req.body;
//     let token = req.cookies["token"]
//     if (!token) {
//         res.redirect("/login");
//     } else {
//         verify(token, process.env.JWT_SECRET!, (err: any, data: any) => {
//             if (err) {
//                 res.redirect("/login");
//             } else {
//                 let existence = existsSync("database.json");
//                 if (!existence) {
//                     const message = "No products available";
//                     const user = "";
//                     res.render("dashboard", { newMessage: message, user: user });
//                 } else {
//                     const database = getFile("database.json");
//                     const userEmail = data.username;
//                     const id = data.id;
//                     const user = database.filter((user: any) => {
//                         return user.user.email === userEmail;
//                     });
//                     const userPosition = database.indexOf(user[0])
//                     const prod = user[0].products;
//                     const products = prod.filter((product: any) => {
//                         return product.name.trim() === name;
//                     });
//                     const productPosition = prod.indexOf(products[0])
//                     products[0].name = name;
//                     products[0].description = description;
//                     products[0].price = price;
//                     products[0].image = image;
//                     products[0].category = category;
//                     products[0].brand = brand;
//                     products[0].countInStock = countInStock;
//                     products[0].numReviews = numReviews
//                     products[0].rating = rating;
//                     prod[productPosition] = products[0]
//                     console.log(prod)
//                     user[0].products = prod
//                     database[userPosition] = user[0]
//                     saveFile(database)
//                     res.redirect('/dashboard');
//                 }
//             }
//         });
//     }
// };
// export const upgradeProductDelete = (req: Request, res: Response) => {
//     let token = req.cookies["token"]
//     if (!token) {
//         res.redirect("/login");
//     } else {
//         verify(token, process.env.JWT_SECRET!, (err: any, data: any) => {
//             if (err) {
//                 res.redirect("/login");
//             } else {
//                 const name = req.params.name;
//                 let existence = existsSync("database.json");
//                 if (!existence) {
//                     const message = "No products available";
//                     const user = "";
//                     res.render("dashboard");
//                 } else {
//                     const database = getFile("database.json");
//                     const userEmail = data.username;
//                     const id = data.id;
//                     const user = database.filter((user: any) => {
//                         return user.user.email === userEmail;
//                     });
//                     const product = user.map((product: any) => {
//                         return product.products
//                     })
//                     const targetProduct = product[0].filter((element: any) => {
//                         return element.name.trim() === name;
//                     })
//                     if (user.length > 0 && targetProduct.length > 0) {
//                         if (user.length === 1){
//                             if (user[0].products.length === 1 && user[0].products[0].title !== '') {
//                                 user[0].products.pop()
//                                 const codePlace = database.indexOf(user[0])
//                                 database[codePlace] = user[0]
//                                 saveFile(database)
//                                 res.redirect('/dashboard')
//                             } else {
//                                 let newData = user[0].products.filter((element: any) => {
//                                     if (element.name !== name) {
//                                         return element
//                                     }
//                                 })
//                                 user[0].products = newData
//                                 const codePlace = database.indexOf(user[0])
//                                 database[codePlace] = user[0]
//                                 saveFile(database)
//                                 res.redirect("/dashboard");
//                             }
//                         }
//                     }
//                 }
//             }
//         })
//     }
// };
