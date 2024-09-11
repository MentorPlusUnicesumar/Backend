import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumStatusReuniao } from '../enum/reuniao-status';

export type ReuniaoDocument = HydratedDocument<Reuniao>;

@Schema()
export class Reuniao {

   @Prop({ 
       type: mongoose.Types.ObjectId,
       ref: 'Mentoria',
       required: true 
   })
   idMentoria: mongoose.Types.ObjectId;

  @Prop({required: true})
  diaReuniao: Date;

  @Prop({
    required: false,
    enum: EnumStatusReuniao,
    default: EnumStatusReuniao.PENDENTE,
  })
  status: EnumStatusReuniao;

  @Prop({ required: false,
    default: '',
  })
  feedback: string;

  @Prop([String])
  materialAnexado: string[];

  @Prop({required: true })
  link: string;
}

export const ReuniaoSchema = SchemaFactory.createForClass(Reuniao);
