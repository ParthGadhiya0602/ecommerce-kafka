import { Product } from "../models/product.model";

export interface IProductRepository {
  create(date: Product): Promise<Product>;
  update(date: Product): Promise<Product>;
  delete(id: number): void;
  find(): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
}
