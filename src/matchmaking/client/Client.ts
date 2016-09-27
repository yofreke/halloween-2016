import { LoggerInstance } from 'winston';

import getLogger from 'utils/logging';

abstract class Client {
  protected socket: SocketIO.Socket;
  protected logger: LoggerInstance;

  constructor (socket: SocketIO.Socket) {
    this.socket = socket;
    this.logger = getLogger('matchmaking:Client:' + socket.id);

    this.addListeners();
  }

  protected abstract addListeners (): void;
}

export default Client;
