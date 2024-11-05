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

export class CreateReuniaoDto {
  @IsMongoId()
  idMentoria: mongoose.Types.ObjectId;

  @IsNotEmpty()
  diaReuniao: string;

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

  @IsString()
  resumo: string;
}
