import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Insira um email válido!' })
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;
}
