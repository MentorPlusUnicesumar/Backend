import {
    ArrayMinSize,
    IsArray,
    IsDate,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { EnumStatusReuniao } from '../enum/reuniao-status';
import mongoose from 'mongoose';
  
  export class CreateReuniaoDto {
    @IsNotEmpty()
    @IsMongoId()
    idMentoria: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    diaReuniao: Date;
  
    @IsNotEmpty()
    @IsEnum(EnumStatusReuniao)
    status: EnumStatusReuniao;
  
    @IsNotEmpty()
    @IsString()
    feedback: string;
  
    @IsArray()
    @IsOptional()
    @ArrayMinSize(0)
    materialAnexado: string[];
  
    @IsString()
    @IsOptional()
    link: string;
  }
  