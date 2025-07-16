import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const idUsuario = Number(client.handshake.query.idUsuario);
    if (idUsuario) {
      console.log(`📡 Usuario ${idUsuario} conectado: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌 Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.join(room);
    console.log(`📥 Cliente ${client.id} unido a sala ${room}`);
  }

  emitirNotificacion(idUsuario: number, notificacion: any) {
    const room = `usuario_${idUsuario}`;
    this.server.to(room).emit('nuevaNotificacion', notificacion);
    console.log(`📤 Notificación enviada a sala ${room}`);
  }
}

