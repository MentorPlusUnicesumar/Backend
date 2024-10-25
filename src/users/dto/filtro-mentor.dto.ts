import { IsString, IsOptional } from 'class-validator';

export class FiltroMentorDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  areas?: string[];
}
