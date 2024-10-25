import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumStatusMentoria } from '../enums/mentorias-status';

export type MentoriaDocument = HydratedDocument<Mentoria>;

@Schema()
export class Mentoria {
  @Prop({ required: true })
  nome: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  idMentor: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  idAluno: mongoose.Types.ObjectId;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Reuniao',
    required: false,
    default: [],
  })
  reuniao: mongoose.Types.ObjectId[];

  @Prop({
    required: false,
    enum: EnumStatusMentoria,
    default: EnumStatusMentoria.PENDENTE,
  })
  status: EnumStatusMentoria;

  @Prop({ required: false, default: '' })
  feedback: string;

  @Prop([String])
  materialAnexado: string[];

  @Prop({ required: true })
  descricao: string;

  @Prop()
  qtdtotal: number;
}

export const MentoriaSchema = SchemaFactory.createForClass(Mentoria);
