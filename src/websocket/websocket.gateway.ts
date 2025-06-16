import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { connected } from 'process';
import { Server, Socket } from 'socket.io'
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server:Server

  handleConnection(client: Socket) {
    console.log(`client connected : ${client.id}`)
  }
  handleDisconnect(client: Socket) {
        console.log(`client disconnected : ${client.id}`)

  }
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any){
    console.log(payload)
  }
}
