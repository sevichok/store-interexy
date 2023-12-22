import { Injectable, ForbiddenException } from '@nestjs/common';
import { Order, OrderStatus, Product } from '@prisma/client';

// ======= repos ======= //
import { OrderRepo } from 'domain/repos/order.repo';
import { OrderItemRepo } from 'domain/repos/orderItem.repo';
import { ProductRepo } from 'domain/repos/product.repo';

@Injectable()
export class OrderService {
  constructor(
    private order_repo: OrderRepo,
    private order_item_repo: OrderItemRepo,
    private product_repo: ProductRepo,
  ) {}

  async getAllOrders() {
    return await this.order_repo.getAllOrders();
  }

  async getActiveOrder(userId: number) {
    return await this.order_repo.getActiveOrder(userId);
  }

  async getOrderById(orderId: number): Promise<Order> {
    return await this.order_repo.getOrderById(orderId);
  }

  async createOrder(userId: number, product: Pick<Product, 'id'>) {
    const newOrder = await this.order_repo.createOrder(userId);
    const newOrderItem = await this.order_item_repo.createOrderItem(product.id);
    const updatedOrder = await this.order_repo.addOrderItemToOrder(newOrder.id, newOrderItem);

    return updatedOrder;
  }

  async updateOrder(userId: number, product: Pick<Product, 'id'>) {
    const activeOrder = await this.order_repo.getActiveOrder(userId);
    if (!activeOrder) {
      return await this.createOrder(userId, product);
    }

    if (activeOrder.status === OrderStatus.COMPLETED || activeOrder.status === OrderStatus.CANCELED) {
      throw new ForbiddenException(`Active order not found`);
    }

    if (activeOrder.orderItems.find((item) => item.productId === product.id)) {
      const orderItemExisting = activeOrder.orderItems.find((item) => item.productId === product.id);
      const existingOrderItem = await this.order_item_repo.getOrderItemById(orderItemExisting.id);

      await this.order_item_repo.updateOrderItemQuantity(
        orderItemExisting.id,
        orderItemExisting.quantity + 1,
        existingOrderItem.product.price,
      );
      await this.order_repo.updateOrderTotalPrice(activeOrder.id);

      return;
    }
    const newOrderItem = await this.order_item_repo.createOrderItem(product.id);
    const updatedOrder = await this.order_repo.addOrderItemToOrder(activeOrder.id, newOrderItem);
    await this.order_repo.updateOrderTotalPrice(activeOrder.id);

    return updatedOrder;
  }

  async deleteOrderById(orderId: number) {
    return await this.order_repo.deleteOrderById(orderId);
  }

  // ======= helpers ======= //

  async cancelOrderById(userId: number, orderId: number) {
    return await this.order_repo.cancelOrderById(userId, orderId);
  }

  async completeOrderById(userId: number, orderId: number) {
    const activeOrder = await this.order_repo.getActiveOrder(userId);
    activeOrder.orderItems.map((item) => this.product_repo.updateProductAvailableAmount(item.productId, item.quantity));

    return await this.order_repo.completeOrderById(userId, orderId);
  }

  async updateOrderTotalPrice(orderId: number) {
    return await this.order_repo.updateOrderTotalPrice(orderId);
  }
}
