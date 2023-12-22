import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategy';
import { UserRepo } from 'domain/repos/user.repo';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, UserRepo],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
