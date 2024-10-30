// src/chat/gateways/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dtos/send-message.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const token = client.handshake.auth.token;

    if (!token) {
      console.log(`No token provided for client ${client.id}`);
      client.disconnect();
      return;
    }

    const jwtService = new JwtService({
      secret: process.env.CONSTANTS_JWT,
    });
    const user = jwtService.decode(token);

    const chats = await this.chatService.findChatsByUser(user._id);

    chats.forEach((chat) => {
      console.log(`Client ${client.id} joined chat ${chat._id}`);
      client.join(chat._id.toString());
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessageDto: SendMessageDto,
  ) {
    const message = await this.chatService.addMessage(sendMessageDto);

    const chatRoomId = sendMessageDto.chatId.toString();
    const isInRoom = Array.from(client.rooms).includes(chatRoomId);

    if (!isInRoom) {
      client.join(chatRoomId);
    }

    this.server.to(chatRoomId).emit('newMessage', message);
  }

  @SubscribeMessage('message')
  teste(client: Socket, data: any) {
    console.log(data);
  }
}
