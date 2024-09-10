import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ReuniaoMentoriaDto } from '../dto/reuniao-mentoria.dto';
import { EnumStatusMentoria } from '../enums/mentorias-status';

export type MentoriaDocument = HydratedDocument<Mentoria>;

@Schema()
export class Mentoria {
  @Prop({ 
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true 
   })
  idMentor: mongoose.Types.ObjectId;

  @Prop({ 
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true 
   })
  idMentorado: mongoose.Types.ObjectId;

  @Prop({ required: false })
  reuniao: ReuniaoMentoriaDto[];

  @Prop({
    required: false,
    enum: EnumStatusMentoria,
    default: EnumStatusMentoria.PENDENTE,
  })
  status: EnumStatusMentoria;

  @Prop({ required: false,
    default: '',
  })
  feedback: string;

  @Prop([String])
  materialAnexado: string[];

  @Prop({required: true })
  descricao: string;
}

export const MentoriaSchema = SchemaFactory.createForClass(Mentoria);