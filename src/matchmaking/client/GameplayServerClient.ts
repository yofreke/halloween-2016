import Client from 'server/Client';


class GameplayServerClient extends Client {
  constructor (socket: SocketIO.Socket) {
    super(socket);
  }

  protected addListeners (): void {
    this.socket.on('checkAuth', this.onCheckAuth.bind(this));
    this.socket.on('room/checkAuth', this.onRoomCheckAuth.bind(this));
    this.socket.on('room/purge', this.onRoomPurge.bind(this));
    this.socket.on('stats/gameResult', this.onGameResult.bind(this));
  }

  private onCheckAuth (data: Object): void {}

  private onRoomCheckAuth (data: Object): void {}

  private onRoomPurge (data: Object): void {}

  private onGameResult (data: Object): void {}
}


export default GameplayServerClient;
