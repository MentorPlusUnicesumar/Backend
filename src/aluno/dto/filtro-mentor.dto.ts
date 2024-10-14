import { IsString, IsOptional } from 'class-validator';

export class FiltroMentorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  areadeinterese?: string[];
}
