import createError, { HttpError } from "http-errors";
import express, { NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import landingPageRoute from './routes/page'

dotenv.config()

import productsRouter from "./routes/products";
import usersRouter from "./routes/users";
import homePage from "./routes/page";
//import productRouter from './routes/product'
const cors = require("cors");


mongoose.connect(process.env.CLUSTER || "string").then(response => {
  console.log('connection established');
  
}).catch(err => {
  if (err) {
    throw err;
  }
})

const app = express();

app.use(express.json());

;

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use('/', landingPageRoute)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler()
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



app.use(express.json());


export default app;
