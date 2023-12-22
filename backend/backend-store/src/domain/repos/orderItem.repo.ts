import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemRepo {
  constructor(private prisma: PrismaService) {}

  async getOrderItemById(orderItemId: number) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id: orderItemId },
      include: {
        order: true,
        product: true,
      },
    });

    if (!orderItem) {
      throw new ForbiddenException(`OrderItem with ID ${orderItemId} not found`);
    }

    return orderItem;
  }

  async deleteOrderItem(orderItemId: number) {
    const existingOrderItem = await this.prisma.orderItem.findUnique({
      where: { id: orderItemId },
    });

    if (!existingOrderItem) {
      throw new ForbiddenException(`Order with ID ${orderItemId} not found`);
    }

    await this.prisma.orderItem.delete({
      where: { id: orderItemId },
    });
  }

  async createOrderItem(productId: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    const newOrderItem = await this.prisma.orderItem.create({
      data: {
        quantity: 1,
        subTotalPrice: product.price,
        productId,
      },
    });

    return newOrderItem;
  }

  //Helpers
  async updateOrderItemQuantity(orderItemId: number, newQuantity: number, productPrice: number): Promise<OrderItem> {
    const updatedOrderItem = await this.prisma.orderItem.update({
      where: { id: orderItemId },
      data: { quantity: newQuantity, subTotalPrice: productPrice * newQuantity },
    });

    return updatedOrderItem;
  }
}
