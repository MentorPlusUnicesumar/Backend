import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'gabrielmarcosprisco@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Insira um email válido!' })
  email: string;

  @ApiProperty({
    example: 'Teste123!',
  })
  @IsNotEmpty()
  @IsString()
  senha: string;
}
