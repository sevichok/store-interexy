import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from './auth.interface';

export const getUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: AuthRequest = ctx.switchToHttp().getRequest();
  if (!data) {
    return request.user;
  }
  return request.user[data];
});
