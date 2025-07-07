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
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private usuariosConectados: Map<number, string> = new Map();

  handleConnection(client: Socket) {
    const idUsuario = Number(client.handshake.query.idUsuario);
    if (idUsuario) {
      this.usuariosConectados.set(idUsuario, client.id);
      console.log(`📡 Usuario ${idUsuario} conectado: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [idUsuario, socketId] of this.usuariosConectados.entries()) {
      if (socketId === client.id) {
        this.usuariosConectados.delete(idUsuario);
        console.log(`🔌 Usuario ${idUsuario} desconectado`);
        break;
      }
    }
  }

  emitirNotificacion(idUsuario: number, notificacion: any) {
    const socketId = this.usuariosConectados.get(idUsuario);
    if (socketId) {
      this.server.to(socketId).emit('nuevaNotificacion', notificacion);
    }else {
    console.warn(`⚠️ Usuario ${idUsuario} no conectado, no se pudo enviar notificación.`);
  }
  }
}
