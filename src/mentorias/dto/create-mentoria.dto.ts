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
import { ReuniaoMentoriaDto } from './reuniao-mentoria.dto';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateMentoriaDto {
  @IsNotEmpty()
  @IsMongoId()
  idMentor: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  idMentorado: mongoose.Types.ObjectId;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReuniaoMentoriaDto)
  reuniao: ReuniaoMentoriaDto[];

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
