import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AlunoDocument = HydratedDocument<Aluno>;

@Schema()
export class Aluno {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  idUser: mongoose.Types.ObjectId;

  @Prop({ required: true, ref: 'Area', type: [mongoose.Types.ObjectId] })
  areasInteresse: mongoose.Types.ObjectId[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
