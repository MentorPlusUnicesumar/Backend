import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({
    example: 'Engenharia de Software',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;
}
