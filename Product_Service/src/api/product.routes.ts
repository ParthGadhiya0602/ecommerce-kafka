import express, { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { ProductRepository } from "../repository/product.repository";
import {
  createErrorResponse,
  createSuccessResponse,
  transformProductToSimpleObject,
} from "../utils/helper";
import {
  createProductValidator,
  updateProductValidator,
} from "../utils/validationSchema";
import { isEmpty } from "lodash";

const router = express.Router();

export const productService = new ProductService(new ProductRepository());

router.post(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if the request body is empty
      if (isEmpty(req.body)) {
        const response = createErrorResponse("PRODUCT-422");
        return res.status(response.meta.statusCode).send(response);
      }

      // Validate the request body
      const { error } = createProductValidator.validate(req.body);
      if (error) {
        const response = createErrorResponse("PRODUCT-400");
        return res.status(response.meta.statusCode).send(response);
      }

      // Create the product
      const data = await productService.createProduct(req.body);
      const response = createSuccessResponse(
        "PRODUCT-201",
        transformProductToSimpleObject(data)
      );
      return res.status(response.meta.statusCode).send(response);
    } catch (err) {
      const response = createErrorResponse("PRODUCT-500");
      return res.status(response.meta.statusCode).send(response);
    }
  }
);

router.patch(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if the request body is empty
      if (isEmpty(req.body)) {
        const response = createErrorResponse("PRODUCT-422");
        return res.status(response.meta.statusCode).send(response);
      }

      // Validate the request body
      const { error } = updateProductValidator.validate(req.body);
      if (error) {
        const response = createErrorResponse("PRODUCT-400");
        return res.status(response.meta.statusCode).send(response);
      }

      // update the product
      const id = +req.params.id;
      const data = await productService.updateProduct({ id, ...req.body });
      const response = createSuccessResponse(
        "PRODUCT-200",
        transformProductToSimpleObject(data)
      );
      return res.status(response.meta.statusCode).send(response);
    } catch (err) {
      const response = createErrorResponse("PRODUCT-500");
      return res.status(response.meta.statusCode).send(response);
    }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Number(req.query["limit"]);
      const offset = Number(req.query["offset"]);

      const data = await productService.getProducts(limit, offset);
      const response = createSuccessResponse(
        data.length > 0 ? "PRODUCT-200" : "PRODUCT-204",
        transformProductToSimpleObject(data)
      );
      return res.status(response.meta.statusCode).send(response);
    } catch (err) {
      const response = createErrorResponse("PRODUCT-500");
      return res.status(response.meta.statusCode).send(response);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.query["id"]);

      const data = await productService.getProduct(id);
      const response = data
        ? createSuccessResponse(
            "PRODUCT-200",
            transformProductToSimpleObject(data)
          )
        : createErrorResponse("PRODUCT-404");
      return res.status(response.meta.statusCode).send(response);
    } catch (err) {
      const response = createErrorResponse("PRODUCT-500");
      return res.status(response.meta.statusCode).send(response);
    }
  }
);
export default router;
