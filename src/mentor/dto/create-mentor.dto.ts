import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TrabDestaqueDto } from './trab-destaque.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';

import mongoose from 'mongoose';

export class CreateMentorDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  sobre: string;

  @IsArray()
  @ArrayMinSize(1)
  competencias: string[];

  @IsArray()
  @ArrayMinSize(1)
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

  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  areaDeEnsino: mongoose.Types.ObjectId[];

  @IsNotEmpty()
  @IsBoolean()
  disponivel: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Max(5, { each: true })
  estrela: number[];
}
