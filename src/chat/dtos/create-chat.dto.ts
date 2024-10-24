// src/chat/dtos/create-chat.dto.ts
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateChatDto {
  @IsNotEmpty()
  idAluno: mongoose.Types.ObjectId;

  @IsNotEmpty()
  idMentor: mongoose.Types.ObjectId;
}
