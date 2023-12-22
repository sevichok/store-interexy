import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { Product } from '@prisma/client';
import { ProductForm } from 'app/product/domain/product.form';

@Injectable()
export class ProductRepo {
  constructor(private prisma: PrismaService) {}

  async getProductById(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        orderItems: true,
      },
    });

    if (!product) {
      throw new ForbiddenException(`Product with ID ${productId} not found`);
    }

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async addNewProduct(newProductDto: ProductForm): Promise<Product> {
    const { price, title, availableAmount, category, description, images } = newProductDto;
    const newProduct = await this.prisma.product.create({
      data: {
        price,
        title,
        availableAmount,
        category,
        images,
        description,
      },
    });

    return newProduct;
  }

  async updateProductAvailableAmount(productId: number, pickedQuantity: number) {
    const existingProduct = await this.prisma.product.findUnique({ where: { id: productId } });

    if (!existingProduct) {
      throw new ForbiddenException(`Product with ID ${productId} not found in database`);
    }

    if (pickedQuantity > existingProduct.availableAmount) {
      throw new ForbiddenException(`Too many picked quantity product with ID ${productId} `);
    }

    const newAmount = existingProduct.availableAmount - pickedQuantity;
    await this.updateProduct(productId, { availableAmount: newAmount });
  }

  async updateProduct(productId: number, updatedProduct: Partial<Product>): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({ where: { id: productId } });

    if (!existingProduct) {
      throw new ForbiddenException(`Product with ID ${productId} not found`);
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: updatedProduct,
    });
  }

  async deleteProduct(productId: number): Promise<void> {
    const existingProduct = await this.prisma.product.findUnique({ where: { id: productId } });

    if (!existingProduct) {
      throw new ForbiddenException(`Product with ID ${productId} not found`);
    }

    await this.prisma.product.delete({ where: { id: productId } });
  }
}
