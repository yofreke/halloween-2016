import * as express from 'express';
import * as socketio from 'socket.io';
import * as winston from 'winston';

import getLogger from 'utils/logging';

import Client from './client/Client';
import EnumClientTypes from './client/EnumClientTypes';
import GameplayServerClient from './client/GameplayServerClient';
import PlayerClient from './client/PlayerClient';


class MatchmakingServer {
  private logger: winston.LoggerInstance;
  private app: express.Application;
  private io: SocketIO.Server;

  private clients: Client[];

  constructor () {
    this.app = null;
    this.logger = getLogger('matchmaking:Server');

    this.clients = [];
  }

  public start (port: number): void {
    this.app = express();
    this.logger.info('Listening on port: ' + port);

    this.addRoutes();
    this.addIo();

    this.app.listen(port);
  }

  public respond (res, data: Object): void {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  }

  private addRoutes (): void {
    this.app.get('/', (req, res) => {
      this.respond(res, { nothingHere: true });
    });
  }

  private addIo (): void {
    this.io = socketio(this.app);
    this.io.on('connection', (socket) => this.addClient(socket));
  }

  private addClient (socket: SocketIO.Socket): void {
    this.logger.debug('New client connection');
    socket.on('login', (data, respond) => {
      let client;
      if (data.clientType === EnumClientTypes.GAMEPLAY_SERVER) {
        client = new GameplayServerClient(socket);
      } else {
        client = new PlayerClient(socket);
      }
      this.clients.push(client);
      // TODO: check auth
      respond({ success: true, token: 'asdf' });
    });
  }
}

export default MatchmakingServer;
