import { Controller, Get, Patch, Delete, HttpCode, HttpStatus, ParseIntPipe, Param } from '@nestjs/common';
import { OrderItemService } from './orderItem.service';
import { getUser } from 'app/auth/decorator';

@Controller('items')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrderItemById(@Param('id', ParseIntPipe) orderId: number) {
    return await this.orderItemService.getOrderItemById(orderId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrderItemById(@Param('id', ParseIntPipe) orderItemId: number) {
    await this.orderItemService.deleteOrderItemById(orderItemId);
  }

  @Patch('update/:orderItemId/:newQuantity')
  @HttpCode(HttpStatus.OK)
  async updateOrderItemQuantity(
    @getUser('sub', ParseIntPipe) userId: number,
    @Param('orderItemId', ParseIntPipe) orderItemId: number,
    @Param('newQuantity', ParseIntPipe) newQuantity: number,
  ) {
    return await this.orderItemService.updateOrderItemQuantity(userId, orderItemId, newQuantity);
  }
}
