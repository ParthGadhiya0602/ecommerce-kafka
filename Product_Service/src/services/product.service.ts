import { IProductRepository } from "../interface/productRepository.interface";
import { Product } from "../models/product.model";
export class ProductService {
  private _repository: IProductRepository;
  constructor(repository: IProductRepository) {
    this._repository = repository;
  }

  async createProduct(input: any): Promise<Product> {
    const data = await this._repository.create(input);
    return data;
  }

  async updateProduct(input: any): Promise<Product> {
    const data = await this._repository.update(input);
    return data;
  }

  async getProducts(limit: number, offset: number): Promise<Product[]> {
    const data = await this._repository.find();
    return data;
  }

  async getProduct(id: number): Promise<Product | null> {
    const data = await this._repository.findOne(id);
    return data;
  }

  deleteProduct(id: number) {}
}
