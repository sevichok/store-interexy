import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from 'domain/repos/user.repo';
import { PrismaModule } from 'libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepo],
})
export class UserModule {}
