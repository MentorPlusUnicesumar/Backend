import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },
  },
  transport: {
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
      user: 'atendimento.mentorplus@hotmail.com',
      pass: 'mentorado123',
    },
    tls: {
      rejectUnauthorized: false, // Pode ser necess�rio para alguns servidores
    },
  },
  defaults: {
    from: '"No Reply" <atendimento.mentorplus@hotmail.com>', // Endere�o de e-mail padr�o
  },
};
