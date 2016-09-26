import { LoggerInstance } from 'winston';

import getLogger from 'utils/logging';

class Client {
  private socket: SocketIO.Socket;
  private logger: LoggerInstance;

  constructor (socket: SocketIO.Socket) {
    this.socket = socket;
    this.logger = getLogger('matchmaking:Client:' + socket.id);

    this.addListeners();
  }

  private addListeners (): void {
    // TODO: implement
  }
}

export default Client;
