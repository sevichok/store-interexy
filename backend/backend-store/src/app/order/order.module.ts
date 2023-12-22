import { Module } from '@nestjs/common';
import { OrderRepo } from 'domain/repos/order.repo';
// import { PrismaModule } from 'libs/prisma/prisma.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemRepo } from 'domain/repos/orderItem.repo';
import { OrderItemService } from 'app/orderItem/orderItem.service';
import { ProductRepo } from 'domain/repos/product.repo';

@Module({
  // imports: [PrismaModule],
  providers: [OrderService, OrderRepo, OrderItemService, OrderItemRepo, ProductRepo],
  controllers: [OrderController],
})
export class OrderModule {}
