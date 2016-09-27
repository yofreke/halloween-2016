import Client from 'server/Client';


class PlayerClient extends Client {
  constructor (socket: SocketIO.Socket) {
    super(socket);
  }

  protected addListeners (): void {
    this.socket.on('joinRoom', this.onJoinRoom.bind(this));
  }

  private onJoinRoom (data: Object): void {}

}


export default PlayerClient;
