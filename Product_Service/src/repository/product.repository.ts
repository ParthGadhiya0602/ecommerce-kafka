import { IProductRepository } from "../interface/productRepository.interface";
import { Product } from "../models/product.model";

export class ProductRepository implements IProductRepository {
  create(date: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  update(date: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): void {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
