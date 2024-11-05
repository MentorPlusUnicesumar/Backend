import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
import { mailerConfig } from './configs/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MentoriasModule } from './mentorias/mentorias.module';
import { ReuniaoModule } from './reuniao/reuniao.module';
import { ChatModule } from './chat/chat.module';
import { AreasModule } from './areas/areas.module';
import { GoogleModule } from './google/google.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    JwtModule,
    MentoriasModule,
    ReuniaoModule,
    ChatModule,
    AreasModule,
    GoogleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
