import { IsString, IsOptional } from 'class-validator';

export class FiltroUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
