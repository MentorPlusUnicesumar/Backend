import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatusMentoria } from '../enums/mentorias-status';
import mongoose from 'mongoose';

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
}
