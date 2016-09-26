import Client from './Client';


class GameplayServerClient extends Client {
  constructor (socket: SocketIO.Socket) {
    super(socket);
  }
}


export default GameplayServerClient;
