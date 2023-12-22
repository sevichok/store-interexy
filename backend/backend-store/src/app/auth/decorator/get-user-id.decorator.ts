import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from './auth.interface';

export const getUserId = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: AuthRequest = ctx.switchToHttp().getRequest();

  return request['sub'];
});
