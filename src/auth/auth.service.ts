import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bycript from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn( loginDto: LoginDto ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    const isMath = await bycript.compare(loginDto.senha, user.senha)

    if (!user || !isMath) {
      throw new NotFoundException('Email ou senha invalidos');
    }
    
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}