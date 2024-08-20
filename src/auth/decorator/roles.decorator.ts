import { SetMetadata } from '@nestjs/common';
import { EnumTypeUser } from 'src/users/enums/user-type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EnumTypeUser[]) =>
  SetMetadata(ROLES_KEY, roles);
