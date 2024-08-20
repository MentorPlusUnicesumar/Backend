import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class NewSenhaUserDto {
  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiÃºscula',
  })
  @Matches(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minÃºscula',
  })
  @Matches(/\d/, { message: 'A senha deve conter pelo menos um nÃºmero' })
  @Matches(/[!@#$%^&*]/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  novasenha: string;

  @IsNotEmpty()
  @IsString()
  confirmasenha: string;
}
