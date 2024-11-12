import { IsString, IsOptional } from 'class-validator';
import { EnumTypeUser } from '../enums/user-type';

export class FiltroUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  typeUser?: EnumTypeUser;
}
