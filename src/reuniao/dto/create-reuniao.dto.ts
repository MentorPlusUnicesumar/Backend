import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatusReuniao } from '../enum/reuniao-status';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReuniaoDto {
  @IsMongoId()
  idMentoria: mongoose.Types.ObjectId;

  @ApiProperty({
    example: '2024-11-06T17:35:00.000Z',
  })
  @IsNotEmpty()
  diaReuniao: Date;

  @IsOptional()
  @IsEnum(EnumStatusReuniao)
  status: EnumStatusReuniao;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  feedback: string;

  @IsOptional()
  @IsArray()
  materialAnexado: string[];

  @IsOptional()
  @IsString()
  link: string;

  @ApiProperty({
    example: 'Aula sobre AWS e conceitos basicos',
  })
  @IsString()
  @IsNotEmpty()
  resumo: string;
}
