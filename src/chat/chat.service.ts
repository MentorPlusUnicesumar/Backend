// src/chat/services/chats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateChatDto } from './dtos/create-chat.dto';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<ChatDocument> {
    // verificar se já existe um chat entre os usuários
    const chatExists = await this.chatModel.findOne({
      $or: [
        { mentorId: createChatDto.mentorId, alunoId: createChatDto.alunoId },
        { mentorId: createChatDto.alunoId, alunoId: createChatDto.mentorId }
      ]
    }).exec();

    if (chatExists) {
      throw new Error('Chat already exists');
    }


    const chat = await this.chatModel.create(createChatDto);
    return chat;
  }

  async findChatsByUser(userId: mongoose.Types.ObjectId): Promise<ChatDocument[]> {
    return await this.chatModel.find({
      $or: [
        { mentorId: userId },
        { alunoId: userId }
      ]
    }).exec();
  }

  async addMessage(sendMessageDto: SendMessageDto): Promise<MessageDocument> {
    const message = await this.messageModel.create(sendMessageDto);
    return message;
  }

  async getMessagesByChatId(chatId: mongoose.Types.ObjectId): Promise<MessageDocument[]> {
    return await this.messageModel.find({ chatId }).exec();
  }
}
