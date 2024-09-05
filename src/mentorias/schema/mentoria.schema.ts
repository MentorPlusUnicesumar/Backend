import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ReuniaoMentoriaDto } from '../dto/reuniao-mentoria.dto';
import { EnumStatusMentoria } from '../enums/mentorias-status';

export type MentoriaDocument = HydratedDocument<Mentoria>;

@Schema()
export class Mentoria {
  @Prop({ required: true })
  idMentor: string;

  @Prop({ required: true })
  idMentorado: string;

  @Prop({ required: true })
  reuniao: ReuniaoMentoriaDto[];

  @Prop({
    required: false,
    enum: EnumStatusMentoria,
    default: EnumStatusMentoria.PENDENTE,
  })
  status: EnumStatusMentoria;

  @Prop({ required: false })
  feedback: string;

  @Prop([String])
  materialAnexado: string[];
}

export const MentoriaSchema = SchemaFactory.createForClass(Mentoria);
