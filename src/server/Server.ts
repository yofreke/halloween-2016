import * as express from 'express';
import * as socketio from 'socket.io';
import * as winston from 'winston';

import getLogger from 'utils/logging';

import IServer from './IServer';
import MatchmakingServer from 'matchmaking';


class Server implements IServer {
  private logger: winston.LoggerInstance;
  private app: express.Application;
  private io: SocketIO.Server;

  private matchmakingServer: MatchmakingServer;

  constructor () {
    this.app = null;
    this.logger = getLogger('Server');

    this.matchmakingServer = new MatchmakingServer(this);
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

    this.matchmakingServer.addIo(this.io);
  }
}

export default Server;
