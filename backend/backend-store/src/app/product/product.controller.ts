import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductForm } from './domain/product.form';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) productId: number) {
    return await this.productService.getProductById(productId);
  }

  @Post('new')
  @HttpCode(HttpStatus.OK)
  async addNewProduct(@Body() newProduct: ProductForm): Promise<Product> {
    return await this.productService.addNewProduct(newProduct);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Param('id', ParseIntPipe) productId: number, @Body() updatedProduct: ProductForm) {
    return await this.productService.updateProduct(productId, updatedProduct);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id', ParseIntPipe) productId: number) {
    return await this.productService.deleteProduct(productId);
  }
}
