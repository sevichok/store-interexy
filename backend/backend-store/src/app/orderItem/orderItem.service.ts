import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';

// ======= repos ======= //
import { OrderRepo } from 'domain/repos/order.repo';
import { OrderItemRepo } from 'domain/repos/orderItem.repo';

@Injectable()
export class OrderItemService {
  constructor(
    private order_items_repo: OrderItemRepo,
    private order_repo: OrderRepo,
  ) {}

  async getOrderItemById(orderItemId: number) {
    return this.order_items_repo.getOrderItemById(orderItemId);
  }

  async deleteOrderItemById(orderItemId: number) {
    return this.order_items_repo.deleteOrderItem(orderItemId);
  }

  async updateOrderItemQuantity(userId: number, orderItemId: number, newQuantity: number): Promise<OrderItem> {
    const currentOrder = await this.order_repo.getActiveOrder(userId);

    if (newQuantity === 0) {
      await this.order_items_repo.deleteOrderItem(orderItemId);
      await this.order_repo.updateOrderTotalPrice(currentOrder.id);
    }

    const currentProduct = await this.getOrderItemById(orderItemId);

    const updatedOrderItem = await this.order_items_repo.updateOrderItemQuantity(
      orderItemId,
      newQuantity,
      currentProduct.product.price,
    );
    await this.order_repo.updateOrderTotalPrice(currentOrder.id);

    return updatedOrderItem;
  }
}
