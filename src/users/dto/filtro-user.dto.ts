import { IsString, IsOptional } from 'class-validator';

export class FiltroUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
