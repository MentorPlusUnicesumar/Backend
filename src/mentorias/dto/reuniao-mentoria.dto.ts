import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatusMentoria } from '../enums/mentorias-status';
import { Type } from 'class-transformer';

export class ReuniaoMentoriaDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  diaReuniao: Date;

  @IsNotEmpty()
  @IsEnum(EnumStatusMentoria)
  status: EnumStatusMentoria;

  @IsNotEmpty()
  @IsString()
  feedback: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  materialAnexado: string[];
}
