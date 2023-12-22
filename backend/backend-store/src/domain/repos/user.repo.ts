import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'domain/dtos/create-user.dto';

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: {
            orderItems: true,
          },
        },
      },
    });

    if (!user) {
      throw new ForbiddenException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        orders: {
          include: {
            orderItems: true,
          },
        },
      },
    });
  }

  async createUser(createUsertDto: CreateUserDto) {
    const { email, password } = createUsertDto;
    const hash = bcrypt.hashSync(password, 10);
    return await this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
  }
}
