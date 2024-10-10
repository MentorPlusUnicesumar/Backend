import { Module } from '@nestjs/common';
import { MentorService } from './mentor.service';
import { MentorController } from './mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mentor, MentorSchema } from './schema/mentor.schema';
import { UsersModule } from 'src/users/users.module';
import { AreasModule } from 'src/areas/areas.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mentor.name, schema: MentorSchema }]),
    UsersModule,
    AreasModule,
  ],
  controllers: [MentorController],
  providers: [MentorService],
  exports: [MentorModule],
})
export class MentorModule {}
