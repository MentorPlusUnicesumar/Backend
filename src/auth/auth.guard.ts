import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorator/auth.decorator';
import { LoginPayload } from 'src/auth/dto/login-payload.dto';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { ROLES_KEY } from 'src/auth/decorator/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let token = '';
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<EnumTypeUser[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    if (authorization) {
      token = authorization.split(' ')[1];
    }

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.CONSTANTS_JWT,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role == loginPayload.typeUser);
  }
}
