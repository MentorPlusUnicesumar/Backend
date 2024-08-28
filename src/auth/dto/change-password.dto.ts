import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  @Matches(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  @Matches(/\d/, { message: 'A senha deve conter pelo menos um número' })
  @Matches(/[!@#$%^&*]/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  senha: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @Matches(/[A-Z]/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  @Matches(/[a-z]/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  @Matches(/\d/, { message: 'A senha deve conter pelo menos um número' })
  @Matches(/[!@#$%^&*]/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  confirmasenha: string;
}
