// src/chat/schemas/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Chat' })
  chatId: mongoose.Types.ObjectId;  // Referência ao ID do chat

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  senderId: mongoose.Types.ObjectId;  // Referência ao ID do usuário que envia a mensagem

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
