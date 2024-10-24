import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const TypeUser = createParamDecorator((_, ctx: ExecutionContext) => {
  let token = '';
  const { authorization } = ctx.switchToHttp().getRequest().headers;
  if (authorization) {
    token = authorization.split(' ')[1];
  }
  const jwtService = new JwtService({
    secret: process.env.CONSTANTS_JWT,
  });
  const user = jwtService.decode(token);
  return user.typeUser;
});
