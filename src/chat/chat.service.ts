// src/chat/services/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateChatDto } from './dtos/create-chat.dto';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<ChatDocument> {
    // verificar se já existe um chat entre os usuários
    const chatExists = await this.chatModel
      .findOne({
        $or: [
          { idMentor: createChatDto.idMentor, idAluno: createChatDto.idAluno },
          { idMentor: createChatDto.idAluno, idAluno: createChatDto.idMentor },
        ],
      })
      .exec();

    if (chatExists) {
      return chatExists;
    }

    const chat = await this.chatModel.create(createChatDto);
    return chat;
  }

  async findChatsByUser(
    userId: mongoose.Types.ObjectId,
  ): Promise<ChatDocument[]> {
    const chats = await this.chatModel
      .find({
        $or: [{ idMentor: userId }, { idAluno: userId }],
      })
      .populate('idMentor idAluno')
      .lean();

    return chats;
  }

  async addMessage(sendMessageDto: SendMessageDto): Promise<MessageDocument> {
    const message = await this.messageModel.create(sendMessageDto);
    return message;
  }

  async getMessagesByChatId(
    chatId: mongoose.Types.ObjectId,
  ): Promise<MessageDocument[]> {
    return await this.messageModel
      .find({ chatId: chatId.toString() })
      .sort({ createdAt: 1 })
      .exec();
  }

  async getLastMessageByChatId(
    chatId: mongoose.Types.ObjectId,
  ): Promise<MessageDocument> {
    const messages = await this.messageModel
      .findOne({ chatId: chatId.toString() })
      .sort({ createdAt: -1 })
      .exec();

    return messages;
  }

  async markMessagesAsRead(
    chatId: mongoose.Types.ObjectId,
    readerId: mongoose.Types.ObjectId,
  ): Promise<void> {
    await this.messageModel.updateMany(
      { chatId: chatId.toString(), senderId: { $ne: readerId } },
      { isRead: true },
    );
  }
}
