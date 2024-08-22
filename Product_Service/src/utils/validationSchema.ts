import Joi, { ObjectSchema } from "joi";
import { Product } from "../models/product.model";

export const createProductValidator: ObjectSchema<Product> = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(1).required(),
  stock: Joi.number().required(),
});

export const updateProductValidator: ObjectSchema<Product> = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().min(1).optional(),
  stock: Joi.number().optional(),
});
