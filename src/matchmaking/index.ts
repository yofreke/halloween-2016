import * as winston from 'winston';

import getLogger from 'utils/logging';

import IServer from 'server/IServer';

import GameplayServerClient from './client/GameplayServerClient';
import PlayerClient from './client/PlayerClient';


class MatchmakingServer {
  private logger: winston.LoggerInstance;
  private server: IServer;

  private backchannelNsp: SocketIO.Namespace;
  private userNsp: SocketIO.Namespace;

  private bcClients: GameplayServerClient[];
  private clients: PlayerClient[];

  constructor (server: IServer) {
    this.server = server;
    this.logger = getLogger('MatchmakingServer');

    this.clients = [];
    this.bcClients = [];
  }

  public addIo (io: SocketIO.Server): void {
    this.backchannelNsp = io.of('matchmaking/backchannel');
    this.backchannelNsp.on('connection', this.addBackchannelClient.bind(this));

    this.userNsp = io.of('users');
    this.userNsp.on('matchmaking/connection', this.addClient.bind(this));
  }

  private addBackchannelClient (socket: SocketIO.Socket): void {
    this.logger.debug('New backchannel connection');
    socket.on('login', (data, respond) => {
      const client = new GameplayServerClient(socket);
      this.bcClients.push(client);
      respond({ success: true, token: 'bc-temp-token' });
    });
  }

  private addClient (socket: SocketIO.Socket): void {
    this.logger.debug('New client connection');
    socket.on('login', (data, respond) => {
      const client = new PlayerClient(socket);
      this.clients.push(client);
      // TODO: check auth
      respond({ success: true, token: 'user-temp-token' });
    });
  }
}

export default MatchmakingServer;
