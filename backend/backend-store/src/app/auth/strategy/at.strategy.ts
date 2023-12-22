import { TokensDto } from 'domain/dtos/tokens.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_ACCESS_TOKEN'),
    });
  }
  validate(payload: TokensDto) {
    return payload;
  }
}
