// src/chat/dtos/send-message.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class SendMessageDto {
  @IsNotEmpty()
  chatId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  senderId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;
}
