import { IsNotEmpty, IsString } from 'class-validator';

export class TrabDestaqueDto {
  @IsNotEmpty()
  @IsString()
  foto: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;
}
