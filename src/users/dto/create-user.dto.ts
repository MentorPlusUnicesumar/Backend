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
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { EnumTypeUser } from '../enums/user-type';
import { EnumStatusUser } from '../enums/user-status';
import { EstadoUF } from '../enums/enum-uf';
import { IsCPF } from 'class-validator-cpf';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TrabDestaqueDto } from './trab-destaque.dto';

export class CreateUserDto {
  @ApiProperty({
    example: 'Gabriel Prisco',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'gabrielprisco@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Insira um email válido!' })
  email: string;

  @ApiProperty({
    example: 'Teste123!',
  })
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

  @ApiProperty({
    example: '4499775-9999',
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    example: 'Admin',
  })
  @IsNotEmpty()
  @IsEnum(EnumTypeUser)
  typeUser: EnumTypeUser;

  @ApiProperty({
    example: 'Analisando',
    description:
      'Valor fixo "Analisando", para aprovar usar a rota "user/update-status/:id"',
  })
  @IsOptional()
  @IsEnum(EnumStatusUser)
  status: EnumStatusUser;

  @ApiProperty({
    example: 'Mandaguari',
  })
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty({
    example: 'Paraná',
  })
  @IsNotEmpty({ message: 'Digite um estado válido' })
  @IsEnum(EstadoUF, { message: 'Digite um estado válido' })
  uf: EstadoUF;

  @ApiProperty({
    example: '805.681.848-07',
  })
  @IsNotEmpty()
  @IsString()
  @IsCPF({ message: 'Digite um CPF valido (ex: 123.456.789-00 ou 12345678900' })
  cpf: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  @IsMongoId({ each: true })
  mentoriasAtivas: mongoose.Types.ObjectId[];

  @ApiProperty({
    example: 'www.url.com.br',
  })
  @IsOptional()
  @IsString()
  fotos: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  areas: mongoose.Types.ObjectId[];

  @IsOptional()
  @IsString()
  sobre: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  competencias: string[];

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  experiencias: string[];

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  trabDestaque: TrabDestaqueDto[];

  @IsOptional()
  @IsString()
  instagram: string;

  @IsOptional()
  @IsString()
  youtube: string;

  @IsOptional()
  @IsString()
  linkedin: string;

  @IsOptional()
  @IsBoolean()
  disponivel: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Max(5, { each: true })
  estrela: number[];
}
