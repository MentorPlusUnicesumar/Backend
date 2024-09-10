import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reuniao, ReuniaoSchema } from './schema/reuniao.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reuniao.name, schema: ReuniaoSchema },
    ]),
  ],
  controllers: [ReuniaoController],
  providers: [ReuniaoService],
})
export class ReuniaoModule {}
