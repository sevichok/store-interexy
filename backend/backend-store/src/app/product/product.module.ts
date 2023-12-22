import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepo } from 'domain/repos/product.repo';
import { PrismaModule } from 'libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductService, ProductRepo],
  controllers: [ProductController],
})
export class ProductModule {}
