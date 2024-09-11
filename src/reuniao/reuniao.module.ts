import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reuniao, ReuniaoSchema } from './schema/reuniao.schema';
import { MentoriasModule } from 'src/mentorias/mentorias.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reuniao.name, schema: ReuniaoSchema },
    ]),
    MentoriasModule
  ],
  controllers: [ReuniaoController],
  providers: [ReuniaoService],
})
export class ReuniaoModule {}
