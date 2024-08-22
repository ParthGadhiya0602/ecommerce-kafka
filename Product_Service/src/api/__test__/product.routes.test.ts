import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import productRouter, { productService } from "../product.routes";
import { productFactory } from "../../utils/fixtures";
import {
  createErrorResponse,
  createSuccessResponse,
  transformProductToSimpleObject,
} from "../../utils/helper";

const app = express();

app.use(express.json());

app.use("/", productRouter);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe("Product routes", () => {
  describe("POST /product", () => {
    test("should create product successfully", async () => {
      const reqBody = mockRequest();

      const product = productFactory.build();

      // Mocking createProduct from product service
      jest
        .spyOn(productService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .post("/product")
        .send(reqBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
    });

    test("should response with validation error 400", async () => {
      const reqBody = mockRequest();

      const response = await request(app)
        .post("/product")
        .send({ ...reqBody, name: "" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
    });

    test("should response with internal error 500", async () => {
      const reqBody = mockRequest();

      // Mocking createProduct from product service
      jest
        .spyOn(productService, "createProduct")
        .mockImplementationOnce(() => Promise.reject("rejected"));

      const response = await request(app)
        .post("/product")
        .send(reqBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
    });
  });

  describe("PATCH /product/:id", () => {
    test("should update product successfully", async () => {
      const product = productFactory.build();

      const reqBody = {
        name: product.name,
        stock: product.stock,
      };

      // Mocking updateProduct from product service
      jest
        .spyOn(productService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send(reqBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });

    test("should response with validation error 400", async () => {
      const product = productFactory.build();

      const reqBody = {
        name: product.name,
        stock: product.stock,
      };

      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send({ ...reqBody, price: 0 })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
    });

    test("should response with internal error 500", async () => {
      const product = productFactory.build();

      const reqBody = {
        name: product.name,
        stock: product.stock,
      };

      // Mocking updateProduct from product service
      jest
        .spyOn(productService, "updateProduct")
        .mockImplementationOnce(() => Promise.reject("rejected"));

      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send(reqBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
    });
  });

  describe("GET /products?limit=0?offset=0", () => {
    test("should return range of products based on filter", async () => {
      const randomLimit = faker.number.int({ min: 10, max: 100 });
      const products = productFactory.buildList(randomLimit);

      jest
        .spyOn(productService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(products));

      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=${1}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });

    test("should process the request and no result found 204", async () => {
      jest
        .spyOn(productService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve([]));

      const response = await request(app)
        .get(`/products?limit=${20}&offset=${1}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(204);
    });

    test("should response with internal error 500", async () => {
      jest
        .spyOn(productService, "getProducts")
        .mockImplementationOnce(() => Promise.reject("rejected"));

      const response = await request(app)
        .get(`/products?limit=${20}&offset=${1}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
    });
  });

  describe("GET /products/:id", () => {
    test("should return a product by id", async () => {
      const id = faker.number.int({ min: 10, max: 100 });
      const product = productFactory.build();

      jest
        .spyOn(productService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve({ ...product, id }));

      const response = await request(app)
        .get(`/products/${id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });

    test("should return response with no result 404", async () => {
      const id = faker.number.int({ min: 10, max: 100 });

      jest
        .spyOn(productService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(null));

      const response = await request(app)
        .get(`/products/${id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
    });

    test("should response with internal error 500", async () => {
      const id = faker.number.int({ min: 10, max: 100 });

      jest
        .spyOn(productService, "getProduct")
        .mockImplementationOnce(() => Promise.reject("rejected"));

      const response = await request(app)
        .get(`/products/${id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
    });
  });
});
