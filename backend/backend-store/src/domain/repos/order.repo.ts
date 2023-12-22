import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import { OrderItem, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderRepo {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      throw new ForbiddenException(`Order with ID ${orderId} not found`);
    }

    return order;
  }

  async getActiveOrder(userId: number) {
    return this.prisma.order.findFirst({
      where: {
        status: 'ACTIVE',
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async deleteOrderById(orderId: number) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });

    if (!existingOrder) {
      throw new ForbiddenException(`Order with ID ${orderId} not found`);
    }

    await this.prisma.order.delete({
      where: { id: orderId },
    });
  }

  async deleteActiveOrder(userId: number) {
    const activeOrder = await this.getActiveOrder(userId);
    await this.prisma.order.delete({
      where: { id: activeOrder.id },
    });
  }

  async createOrder(userId: number) {
    const newOrder = await this.prisma.order.create({
      data: {
        userId: userId,
        title: 'Order',
        status: 'ACTIVE',
        totalPrice: 0,
      },
      include: {
        orderItems: true,
      },
    });

    return newOrder;
  }

  async addOrderItemToOrder(orderId: number, orderItem: OrderItem) {
    const currentOrder = await this.getOrderById(orderId);
    if (currentOrder.status === OrderStatus.COMPLETED || currentOrder.status === OrderStatus.CANCELED) {
      throw new ForbiddenException(`Active order with ${orderId} not found`);
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        totalPrice: orderItem.subTotalPrice * orderItem.quantity,
        orderItems: {
          connect: { id: orderItem.id },
        },
      },
    });

    return updatedOrder;
  }

  async cancelOrderById(userId: number, orderId: number) {
    return await this.prisma.order.update({
      where: { id: orderId, userId: userId },
      data: { status: OrderStatus.CANCELED },
    });
  }

  async completeOrderById(userId: number, orderId: number) {
    return await this.prisma.order.update({
      where: { id: orderId, userId: userId },
      data: { status: OrderStatus.COMPLETED },
    });
  }

  async updateOrderTotalPrice(orderId: number) {
    const order = await this.getOrderById(orderId);
    const totalPrice = order.orderItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { totalPrice },
      include: { orderItems: true },
    });
  }
}
