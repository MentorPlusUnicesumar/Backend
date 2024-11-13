import { SetMetadata } from '@nestjs/common';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { EnumTypeUser } from 'src/users/enums/user-type';

export const ROLES_KEY = 'roles';
export const STATUS_KEY = 'status';

export const Roles = (
  roles: EnumTypeUser[] = [],
  statuses: EnumStatusUser[] = [],
) => {
  return SetMetadata(ROLES_KEY, roles), SetMetadata(STATUS_KEY, statuses);
};
