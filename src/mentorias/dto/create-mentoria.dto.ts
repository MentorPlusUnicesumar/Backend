import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatusMentoria } from '../enums/mentorias-status';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMentoriaDto {
  @ApiProperty({
    example: 'AWS Migrations',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    example: '672beedad1852f16f2f0cdac',
  })
  @IsNotEmpty()
  @IsMongoId()
  idMentor: mongoose.Types.ObjectId;

  @ApiProperty({
    example: '672beed9d1852f16f2f0cda0',
  })
  @IsNotEmpty()
  @IsMongoId()
  idAluno: mongoose.Types.ObjectId;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  @IsMongoId({ each: true })
  reuniao: mongoose.Types.ObjectId[];

  @IsOptional()
  @IsEnum(EnumStatusMentoria)
  status: EnumStatusMentoria;

  @IsOptional()
  @IsString()
  feedback: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  materialAnexado: string[];

  @ApiProperty({
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  qtdtotal: number;
}
