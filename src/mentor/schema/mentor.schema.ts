import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TrabDestaqueDto } from '../dto/trab-destaque.dto';

export type MentorDocument = HydratedDocument<Mentor>;

@Schema()
export class Mentor {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  idUser: mongoose.Types.ObjectId;

  @Prop({ required: true })
  sobre: string;

  @Prop({ required: true, type: [String] })
  competencias: string[];

  @Prop({ required: true, type: [String] })
  experiencias: string[];

  @Prop({ required: false, type: [TrabDestaqueDto] })
  trabDestaque: TrabDestaqueDto[];

  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false })
  youtube: string;

  @Prop({ required: false })
  linkedin: string;

  @Prop({ required: true, ref: 'Area', type: [mongoose.Types.ObjectId] })
  areaDeEnsino: mongoose.Types.ObjectId[];

  @Prop({ required: true })
  disponivel: boolean;

  @Prop({ required: true, type: [Number], min: 1, max: 5 })
  estrela: number[];
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);
