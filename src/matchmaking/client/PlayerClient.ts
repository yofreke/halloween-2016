import Client from 'server/Client';


class PlayerClient extends Client {
  constructor (socket: SocketIO.Socket) {
    super(socket);
  }

  protected addListeners (): void {
    this.socket.on('getNewMatch', this.onGetNewMatch.bind(this));
  }

  private onGetNewMatch (data: Object): void {}

}


export default PlayerClient;
