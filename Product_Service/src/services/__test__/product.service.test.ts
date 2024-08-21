import { IProductRepository } from "../../interface/productRepository.interface";
import { faker } from "@faker-js/faker";

const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe("Product service", () => {
  let repository: IProductRepository;
  beforeEach(() => {});

  afterEach(() => {});

  describe("createProduct", () => {
    test("should create product", () => {});
    test("should throw error with product already exist", () => {});
  });
});
