import { Module } from '@nestjs/common';
import { MentoriasService } from './mentorias.service';
import { MentoriasController } from './mentorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mentoria, MentoriaSchema } from './schema/mentoria.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mentoria.name, schema: MentoriaSchema },
    ]),
    UsersModule,
  ],
  controllers: [MentoriasController],
  providers: [MentoriasService],
  exports: [MentoriasService],
  
})
export class MentoriasModule {}
