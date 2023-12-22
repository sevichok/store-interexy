import { Controller, Get, UseGuards, ParseIntPipe } from '@nestjs/common';
import { getUser } from 'app/auth/decorator';
import { JwtAtGuard } from 'app/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtAtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  async getUserById(@getUser('id', ParseIntPipe) userId: number) {
    return await this.userService.getUserById(userId);
  }
}
