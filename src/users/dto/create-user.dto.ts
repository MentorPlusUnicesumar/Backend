import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsEmail,
  MinLength,
  Matches,
  IsMongoId,
} from 'class-validator';
import { EnumTypeUser } from '../enums/user-type';
import { EnumStatusUser } from '../enums/user-status';
import { EstadoUF } from '../enums/enum-uf';
import { IsCPF } from 'class-validator-cpf';
import mongoose from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Insira um email válido!' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  @Matches(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  @Matches(/\d/, { message: 'A senha deve conter pelo menos um número' })
  @Matches(/[!@#$%^&*]/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  senha: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEnum(EnumTypeUser)
  typeUser: EnumTypeUser;

  @IsOptional()
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
  @IsCPF({ message: 'Digite um CPF valido (ex: 123.456.789-00 ou 12345678900' })
  cpf: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  @IsMongoId({ each: true })
  mentoriasAtivas: mongoose.Types.ObjectId[];


  @IsOptional()
  @IsString()
  fotos: string;
}
