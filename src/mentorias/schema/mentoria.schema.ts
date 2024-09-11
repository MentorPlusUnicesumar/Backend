import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumStatusMentoria } from '../enums/mentorias-status';
import { CreateReuniaoDto } from 'src/reuniao/dto/create-reuniao.dto';

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
  idMentorado: mongoose.Types.ObjectId;

  @Prop({ required: false })
  reuniao: CreateReuniaoDto[];

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
}

export const MentoriaSchema = SchemaFactory.createForClass(Mentoria);
