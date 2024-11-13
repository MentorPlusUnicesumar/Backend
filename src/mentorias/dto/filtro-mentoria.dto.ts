import { IsString, IsOptional } from 'class-validator';

export class FiltroMentoriaDto {
  @IsString()
  @IsOptional()
  nomeAluno?: string;

  @IsString()
  @IsOptional()
  nomeMentor?: string;
}
