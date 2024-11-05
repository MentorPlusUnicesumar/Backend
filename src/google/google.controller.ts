// google-auth.controller.ts
import { Controller, Get, Query, Redirect, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  private readonly logger = new Logger(GoogleController.name);
  constructor(private readonly googleService: GoogleService) {}

  @Get('auth')
  @Redirect()
  async auth() {
    const url = this.googleService.getAuthUrl();
    return { url };
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    try {
      await this.googleService.setTokens(code);
      res.send('Autenticação bem-sucedida! Você pode fechar esta janela.');
    } catch (error) {
      this.logger.error('Erro durante a autenticação.', error);
      res.status(500).send('Erro durante a autenticação.');
    }
  }
}
