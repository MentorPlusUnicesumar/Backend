import { IsEnum } from 'class-validator';
import { EnumStatusUser } from '../enums/user-status';

export class UpdateUserStatusDto {
  @IsEnum(EnumStatusUser, { message: 'Status inválido' })
  status: EnumStatusUser;
}
