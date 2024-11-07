import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TrabDestaqueDto {
  @ApiProperty({
    example: 'url.com.br',
  })
  @IsNotEmpty()
  @IsString()
  foto: string;

  @ApiProperty({
    example: 'Projeto Finalizado',
  })
  @IsNotEmpty()
  @IsString()
  descricao: string;
}
