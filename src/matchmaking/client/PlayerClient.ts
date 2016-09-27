import Client from './Client';


class GameplayServerClient extends Client {
  constructor (socket: SocketIO.Socket) {
    super(socket);
  }

  protected addListeners (): void {
    this.socket.on('getNewMatch', this.onGetNewMatch.bind(this));
  }

  private onGetNewMatch (data: Object): void {}

}


export default GameplayServerClient;
