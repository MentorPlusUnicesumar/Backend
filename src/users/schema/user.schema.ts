import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumTypeUser } from '../enums/user-type';
import { EnumStatusUser } from '../enums/user-status';
import { EstadoUF } from '../enums/enum-uf';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true })
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
}

export const UserSchema = SchemaFactory.createForClass(User);
