import joi from "joi"


export const registerUserSchema = joi.object().keys({
  fullname: joi.string().trim().lowercase().required(),
  username: joi.string().trim().lowercase().required(),
  email: joi.string().required(),
  password: joi
    .string()
    .regex(/^\d{4,18}$/)
    .required(),
  confirm_password: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  gender: joi.string().trim().lowercase().required(),
  phone: joi.number().required(),
  address: joi.string().trim().lowercase().required(),
});

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ""
        }
    }
}



//login

export const loginUserSchema = joi.object().keys({
  email: joi.string().trim().required(),
  password: joi
    .string()
    .regex(/^[a-zA-Z0-9]{6,18}$/)
    .trim()
    .required()
});

//create
export const createProductSchema = joi.object().keys({
  name: joi.string().lowercase().required(),
  image: joi.string().lowercase().required(),
  brand: joi.string().lowercase().required(),
  category: joi.string().lowercase().required(),
  description: joi.string().lowercase().required(),
  price: joi.number().required(),
  countInStock: joi.number().required(),
  rating: joi.number().required(),
  numReview: joi.number().required(),
});

//update
export const updateProductSchema = joi.object().keys({
  price: joi.number(),
  countInStock: joi.number(),
  rating: joi.number(),
  numReview: joi.number(),
});
