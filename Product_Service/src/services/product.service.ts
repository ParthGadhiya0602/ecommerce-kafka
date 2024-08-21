import { IProductRepository } from "../interface/productRepository.interface";
export class ProductService {
  private _repository: IProductRepository;
  constructor(repository: IProductRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
  }

  updateProduct(input: any) {}

  getProducts(limit: number, offset: number) {}

  getProduct(id: number) {}

  deleteProduct(id: number) {}
}
