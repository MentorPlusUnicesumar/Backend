import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateChatDto } from './dtos/create-chat.dto';
import { ChatService } from './chat.service';
import { UserId } from 'src/users/decorator/user-id.dto';
import mongoose from 'mongoose';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Get()
  async getChatsByUser(@UserId() userId: mongoose.Types.ObjectId) {
    const chats = await this.chatService.findChatsByUser(userId);

    const result = [];
    for (const chat of chats) {
      result.push({
        ...chat,
        lastMessage: await this.chatService.getLastMessageByChatId(chat._id),
      });
    }

    return result;
  }

  @Get(':chatId')
  async getMessagesByChatId(
    @Param('chatId', ValidateObjectIdPipe) chatId: mongoose.Types.ObjectId,
  ) {
    return await this.chatService.getMessagesByChatId(chatId);
  }
}