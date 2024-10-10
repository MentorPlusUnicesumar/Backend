// src/chat/gateways/chat.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatsService } from './chat.service';
  import { SendMessageDto } from './dtos/send-message.dto';
import { CreateChatDto } from './dtos/create-chat.dto';

  @WebSocketGateway({ cors: true })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly chatsService: ChatsService) {}
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('createChat')
    async handleCreateChat(client: Socket, createChatDto: CreateChatDto) {
    try {
        const chat = await this.chatsService.createChat(createChatDto);
        client.join(chat._id.toString()); // Adiciona o cliente à sala do chat criado
        this.server.to(chat._id.toString()).emit('chatCreated', chat); // Notifica outros clientes sobre o novo chat
        console.log(`Chat created between ${createChatDto.mentorId} and ${createChatDto.alunoId}`);
    } catch (error) {
        client.emit('error', error.message); // Emite um erro para o cliente em caso de falha
    }
    }

    
    @SubscribeMessage('joinChat')
    handleJoinChat(client: Socket, chatId: string) {
        client.join(chatId);
        console.log(`Client ${client.id} joined chat ${chatId}`);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() sendMessageDto: SendMessageDto) {
      const message = await this.chatsService.addMessage(sendMessageDto);
      this.server.to(sendMessageDto.chatId.toString()).emit('message', message);
    }
  }
  