import winston from 'winston';

import getLogger from 'utils/logging';


class User {
  public name: string;
  private logger: winston.LoggerInstance;

  constructor (name: string) {
    this.name = name;
    this.logger = getLogger('matchmaking:User:' + this.name);
  }
}


export default User;
