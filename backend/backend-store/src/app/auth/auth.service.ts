import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../libs/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ======= repos ======= //
import { UserRepo } from 'domain/repos/user.repo';

// ======= forms, types, dtos ======= //
import { TokensDto } from '../../domain/dtos/tokens.dto';
import { CreateUserDto } from 'domain/dtos/create-user.dto';
import { AuthForm } from './domain/auth.form';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private user_repo: UserRepo,
  ) {}

  async signup(dto: CreateUserDto): Promise<TokensDto> {
    try {
      const user = await this.user_repo.createUser(dto);
      const tokens = await this.signTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Invalid credentials email taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthForm): Promise<TokensDto> {
    const user = await this.user_repo.getUserByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Invalid email credentials');
    }
    const validPswrd = await bcrypt.compare(dto.password, user.password);
    if (!validPswrd) {
      throw new ForbiddenException('Invalid password credentials');
    }
    const tokens = await this.signTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.user_repo.getUserById(userId);
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Invalid user not found');
    }
    const rtCompare = refreshToken === user.hashedRt;
    if (!rtCompare) {
      throw new ForbiddenException('Invalid compared credentials');
    }

    const tokens = await this.signTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  // ======= helpers ======= //
  async signTokens(userId: number, email: string): Promise<TokensDto> {
    const dataJwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(dataJwtPayload, {
        expiresIn: 60 * 15 * 24,
        secret: this.config.get('JWT_SECRET_ACCESS_TOKEN'),
      }),
      this.jwt.signAsync(dataJwtPayload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: this.config.get('JWT_SECRET_REFRESH_TOKEN'),
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(userId: number, refreshToken: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: refreshToken,
      },
    });
  }
}
