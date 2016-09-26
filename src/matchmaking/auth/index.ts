import { LoggerInstance } from 'winston';

import getLogger from 'utils/logging';

import EnumAuthLevels from './EnumAuthLevels';
import User from './User';


const logger: LoggerInstance = getLogger('matchmaking:Auth');


class AuthService {
  public generateToken (user: User, authLevel: EnumAuthLevels): string {
    logger.debug('Generating token for: ' + user.name);
    return user.name + authLevel;
  }

  public checkToken (token: String): boolean {
    // TODO:
    return true;
  }
}


export default new AuthService();
