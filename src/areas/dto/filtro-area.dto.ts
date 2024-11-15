import { IsOptional, IsString } from 'class-validator';

export class FiltroAreaDto {
  @IsString()
  @IsOptional()
  nome?: string;
}
