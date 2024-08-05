import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { EnumTypeUser } from '../enums/user-type';
import { EnumStatusUser } from '../enums/user-status';
import { EstadoUF } from '../enums/enum-uf';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Insira um email válido!' })
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEnum(EnumTypeUser)
  typeUser: EnumTypeUser;

  @IsNotEmpty()
  @IsEnum(EnumStatusUser)
  status: EnumStatusUser;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty({ message: 'Digite um estado válido' })
  @IsEnum(EstadoUF, { message: 'Digite um estado válido' })
  uf: EstadoUF;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  mentoriasAtivas: string[];

  @IsNotEmpty()
  @IsString()
  fotos: string;
}
