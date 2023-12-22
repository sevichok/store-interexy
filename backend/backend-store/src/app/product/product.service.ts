import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepo } from 'domain/repos/product.repo';
import { ProductForm } from './domain/product.form';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepo) {}

  async getProductById(productId: number) {
    return await this.repository.getProductById(productId);
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.repository.getAllProducts();
    return products;
  }

  async addNewProduct(newProductDto: ProductForm): Promise<Product> {
    const newProduct = await this.repository.addNewProduct(newProductDto);
    return newProduct;
  }

  async updateProduct(productId: number, updatedProduct: Partial<Product>): Promise<Product> {
    return this.repository.updateProduct(productId, updatedProduct);
  }

  async deleteProduct(productId: number): Promise<void> {
    return await this.repository.deleteProduct(productId);
  }
}
