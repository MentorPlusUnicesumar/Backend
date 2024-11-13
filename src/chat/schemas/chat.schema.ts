// src/chat/schemas/chat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  idAluno: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  idMentor: mongoose.Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
