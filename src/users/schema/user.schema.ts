import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumTypeUser } from '../enums/user-type';
import { EnumStatusUser } from '../enums/user-status';
import { EstadoUF } from '../enums/enum-uf';
import { TrabDestaqueDto } from '../dto/trab-destaque.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: false })
  telefone: string;

  @Prop({ required: true, enum: EnumTypeUser })
  typeUser: EnumTypeUser;

  @Prop({
    required: true,
    enum: EnumStatusUser,
    default: EnumStatusUser.ANALISANDO,
  })
  status: EnumStatusUser;

  @Prop({ required: true })
  cidade: string;

  @Prop({ required: true, enum: EstadoUF })
  uf: EstadoUF;

  @Prop({ required: true })
  cpf: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Mentoria',
    required: false,
    default: [],
  })
  mentoriasAtivas: mongoose.Types.ObjectId[];

  @Prop({ required: false })
  fotos: string;

  @Prop({ required: false, ref: 'Area', type: [mongoose.Types.ObjectId] })
  areas: mongoose.Types.ObjectId[];

  @Prop({ required: false })
  sobre: string;

  @Prop({ required: false, type: [String] })
  competencias: string[];

  @Prop({ required: false, type: [String] })
  experiencias: string[];

  @Prop({ required: false, type: [TrabDestaqueDto] })
  trabDestaque: TrabDestaqueDto[];

  @Prop({ required: false })
  instagram: string;

  @Prop({ required: false })
  youtube: string;

  @Prop({ required: false })
  linkedin: string;

  @Prop({ required: false })
  disponivel: boolean;

  @Prop({ required: false, type: [Number], min: 1, max: 5 })
  estrela: number[];

  @Prop({ required: true })
  motivoCadastro: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
