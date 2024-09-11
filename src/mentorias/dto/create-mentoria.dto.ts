import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnumStatusMentoria } from '../enums/mentorias-status';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { CreateReuniaoDto } from 'src/reuniao/dto/create-reuniao.dto';

export class CreateMentoriaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsMongoId()
  idMentor: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  idMentorado: mongoose.Types.ObjectId;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateReuniaoDto)
  reuniao: CreateReuniaoDto[];

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
}
