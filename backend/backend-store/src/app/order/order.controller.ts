import { Controller, Get, Post, Delete, Patch, HttpCode, HttpStatus, Param, Body, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { getUser } from 'app/auth/decorator';
import { ProductForm } from 'app/product/domain/product.form';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Get('active')
  @HttpCode(HttpStatus.OK)
  async getActiveOrder(@getUser('sub', ParseIntPipe) userId: number) {
    return await this.orderService.getActiveOrder(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrderById(@Param('id', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrderById(orderId);
  }

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@getUser('sub', ParseIntPipe) userId: number, @Body() product: ProductForm) {
    return await this.orderService.createOrder(userId, product);
  }

  @Post('update')
  @HttpCode(HttpStatus.CREATED)
  async updateOrder(@getUser('sub', ParseIntPipe) userId: number, @Body() product: ProductForm) {
    return await this.orderService.updateOrder(userId, product);
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelOrder(@getUser('sub', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) orderId: number) {
    return await this.orderService.cancelOrderById(userId, orderId);
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.OK)
  async completeOrder(@getUser('sub', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) orderId: number) {
    return await this.orderService.completeOrderById(userId, orderId);
  }

  @Delete(':id/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseIntPipe) orderId: number) {
    return await this.orderService.deleteOrderById(orderId);
  }
}
