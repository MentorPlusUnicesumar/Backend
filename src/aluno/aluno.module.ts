import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aluno, AlunoSchema } from './schema/aluno.schema';
import { UsersModule } from 'src/users/users.module';
import { AreasModule } from 'src/areas/areas.module';
import { MentorModule } from 'src/mentor/mentor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aluno.name, schema: AlunoSchema }]),
    UsersModule,
    AreasModule,
    MentorModule,
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
