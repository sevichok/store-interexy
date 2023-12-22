import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensDto, AuthDto } from '../../domain/dtos';
import { PrismaService } from '../../libs/prisma/prisma.service';

describe('AuthController Jest unit tests', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signin call', () => {
    it('1. should call authService.signin with the provided DTO', () => {
      const dto: AuthDto = {
        email: 'test@gmail.com',
        password: 'test123',
      };
      const signinResult: TokensDto = {
        access_token: 'mockedToken',
        refresh_token: 'mockedToken',
      };
      const authServiceSigninSpy = jest.spyOn(authService, 'signin').mockResolvedValueOnce(signinResult);

      controller.signin(dto);

      expect(authServiceSigninSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe('signup call', () => {
    it('2. should call authService.signup with the provided DTO', () => {
      const dto: AuthDto = {
        email: 'test@gmail.com',
        password: 'test123',
      };
      const signupResult: TokensDto = {
        access_token: 'mockedToken',
        refresh_token: 'mockedToken',
      };
      const authServiceSignupSpy = jest.spyOn(authService, 'signup').mockResolvedValueOnce(signupResult);

      controller.signup(dto);

      expect(authServiceSignupSpy).toHaveBeenCalledWith(dto);
    });

    it('3. should return the result from authService.signup', async () => {
      const dto: AuthDto = {
        email: 'test@gmail.com',
        password: 'test123',
      };
      try {
        const result = await controller.signup(dto);
        expect(result).toBeDefined();
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toEqual('Invalid credentials email taken');
      }
    });

    afterEach(() => {
      jest.restoreAllMocks(); // Restore all mocks after each test
    });
  });
});
