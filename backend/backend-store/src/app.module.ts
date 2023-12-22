import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'app/auth/auth.module';
import { UserModule } from 'app/user/user.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAtGuard } from 'app/auth/guard';
import { ProductModule } from './app/product/product.module';
import { OrderModule } from './app/order/order.module';
import { OrderItemModule } from 'app/orderItem/orderItem.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ProductModule,
    OrderItemModule,
    OrderModule,
  ],
  // exports: [AuthModule],
  // controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAtGuard,
    },
  ],
})
export class AppModule {}
