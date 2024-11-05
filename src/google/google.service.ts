// google-calendar.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { google, Auth, calendar_v3 } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);
  private oAuth2Client: Auth.OAuth2Client;
  private tokenPath = path.join(process.cwd(), 'token.json');
  private scopes = ['https://www.googleapis.com/auth/calendar'];

  constructor() {
    const credentials = JSON.parse(
      fs.readFileSync('credentials.json', 'utf-8'),
    );
    const { client_id, client_secret, redirect_uris } =
      credentials.web || credentials.installed;
    this.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );
  }

  public getAuthUrl(): string {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      prompt: 'consent',
    });
    return authUrl;
  }

  public async setTokens(code: string): Promise<void> {
    try {
      const { tokens } = await this.oAuth2Client.getToken(code);
      if (!tokens || !tokens.access_token || !tokens.refresh_token) {
        this.logger.error('Erro ao adquirir tokens de acesso ou refresh.');
        throw new Error('Tokens de acesso ou refresh não foram adquiridos.');
      }
      this.oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(this.tokenPath, JSON.stringify(tokens));
      this.logger.log('Tokens adquiridos e salvos com sucesso.');
    } catch (error) {
      this.logger.error('Erro ao configurar tokens.', error);
      throw error;
    }
  }

  private async loadTokens(): Promise<void> {
    if (fs.existsSync(this.tokenPath)) {
      const tokens = JSON.parse(fs.readFileSync(this.tokenPath, 'utf-8'));
      if (!tokens || (!tokens.access_token && !tokens.refresh_token)) {
        this.logger.error(
          'Tokens inválidos no arquivo. É necessário nova autorização.',
        );
        throw new Error('Tokens inválidos. É necessário nova autorização.');
      }
      this.oAuth2Client.setCredentials(tokens);
      this.logger.log('Tokens carregados do arquivo.');
    } else {
      this.logger.warn(
        'Nenhum token encontrado. Autorização do usuário necessária.',
      );
      throw new Error(
        'Nenhum token encontrado. Autorização do usuário necessária.',
      );
    }
  }

  public async createMeeting(
    date: string,
    emails: string[],
    summary = 'Reunião Agendada',
    description = 'Reunião para discutir tópicos importantes',
  ): Promise<string> {
    await this.loadTokens();

    const calendar = google.calendar({
      version: 'v3',
      auth: this.oAuth2Client,
    });

    const event: calendar_v3.Schema$Event = {
      summary,
      description,
      start: {
        dateTime: date,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: new Date(
          new Date(date).getTime() + 60 * 60 * 1000,
        ).toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
      attendees: emails.map((email) => ({ email })),
      reminders: {
        useDefault: true,
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
      });

      const eventResponse = response.data;

      const meetLink =
        eventResponse.hangoutLink ||
        eventResponse.conferenceData?.entryPoints?.[0]?.uri;

      if (meetLink) {
        this.logger.log(
          `Evento criado com sucesso! Link para a reunião: ${meetLink}`,
        );
        return meetLink;
      } else {
        this.logger.error('Erro: Link do Google Meet não encontrado.');
        throw new Error('Link do Google Meet não encontrado.');
      }
    } catch (error) {
      this.logger.error('Erro ao criar evento no Google Calendar.', error);
      throw error;
    }
  }
}
