// src/chat/dtos/create-chat.dto.ts
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateChatDto {
  @IsNotEmpty()
  alunoId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  mentorId: mongoose.Types.ObjectId;
}
