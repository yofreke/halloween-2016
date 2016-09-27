import * as winston from 'winston';

import getLogger from 'utils/logging';

import IServer from 'server/IServer';

import GameplayServerClient from './client/GameplayServerClient';
import PlayerClient from './client/PlayerClient';


class GameplayServer {
  private logger: winston.LoggerInstance;
  private server: IServer;

  private backchannelNsp: SocketIO.Namespace;
  private userNsp: SocketIO.Namespace;

  private bcClients: GameplayServerClient[];
  private clients: PlayerClient[];

  constructor (server: IServer) {
    this.server = server;
    this.logger = getLogger('GameplayServer');

    this.clients = [];
    this.bcClients = [];
  }

  public addIo (io: SocketIO.Server): void {
    this.userNsp = io.of('users');
    this.userNsp.on('gameplay/connection', this.addClient.bind(this));
  }

  private addClient (socket: SocketIO.Socket): void {
    this.logger.debug('New client connection');
    socket.on('login', (data, respond) => {
      const client = new PlayerClient(socket);
      this.clients.push(client);
      // TODO: check auth
      respond({ success: true, token: 'user-temp-token-gameplay' });
    });
  }
}

export default GameplayServer;
