import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/auth.decorator';
import { AuthInterface } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto): Promise<AuthInterface> {
    return this.authService.signIn(loginDto);
  }

  @Get()
  findAll() {
    return [];
  }

  @Post('refresh')
  refreshToken(@Body() body: {refresh_token: string}): Promise<AuthInterface> {
    return this.authService.refreshToken(body);
  }
}