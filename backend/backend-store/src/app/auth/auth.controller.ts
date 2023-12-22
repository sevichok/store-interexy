import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRtGuard } from './guard';
import { Public, getUser } from './decorator';

// ======= forms ======= //
import { AuthForm } from './domain/auth.form';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthForm) {
    return this.authService.signin(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() dto: AuthForm) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@getUser('sub', ParseIntPipe) userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(@getUser('sub') userId: number, @getUser('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
