import * as http from 'http';

import * as express from 'express';
import * as socketio from 'socket.io';
import * as winston from 'winston';

import getLogger from 'utils/logging';

import IServer from './IServer';
import GameplayServer from 'gameplay';
import MatchmakingServer from 'matchmaking';

import config from 'config';


class Server implements IServer {
  private logger: winston.LoggerInstance;
  private app: express.Application;
  private server: http.Server;
  private io: SocketIO.Server;

  private matchmakingServer: MatchmakingServer;
  private gameplayServer: GameplayServer;

  constructor () {
    this.app = null;
    this.logger = getLogger('Server');

    if (config.runMatchmaking) {
      this.matchmakingServer = new MatchmakingServer(this);
    }
    if (config.runGameplay) {
      this.gameplayServer = new GameplayServer(this);
    }
  }

  public start (port: number): void {
    this.logger.debug('Initializing server');
    this.app = express();
    this.server = http.createServer(this.app as any);

    this.addRoutes();
    this.addIo();

    this.logger.info('Listening on port: ' + port);
    this.server.listen(port);
  }

  public respond (res, data: Object): void {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  }

  private addRoutes (): void {
    this.logger.debug('Adding routes');
    this.app.get('/', (req, res) => {
      this.respond(res, { nothingHere: true });
    });
  }

  private addIo (): void {
    this.logger.debug('Adding socket.io');
    this.io = socketio(this.server);

    if (this.matchmakingServer) {
      this.matchmakingServer.addIo(this.io);
    }
    if (this.gameplayServer) {
      this.gameplayServer.addIo(this.io);
    }
  }
}

export default Server;
