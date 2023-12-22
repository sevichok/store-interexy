import { Module } from '@nestjs/common';
import { OrderItemRepo } from 'domain/repos/orderItem.repo';
import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';
import { ProductRepo } from 'domain/repos/product.repo';
import { OrderRepo } from 'domain/repos/order.repo';
// import { OrderRepo } from 'domain/repos/order.repo';
// import { PrismaService } from 'libs/prisma/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemRepo, OrderItemService, ProductRepo, OrderRepo],
})
export class OrderItemModule {}
