import * as _ from 'lodash';
import * as randomstring from 'randomstring';
import * as winston from 'winston';
import * as yargs from 'yargs';

import getLogger from 'utils/logging';


const logger: winston.LoggerInstance = getLogger('config');


const config = {
  runGameplay: false,
  runMatchmaking: false,
  backchannelToken: '',
  port: 8081
};


export const parseCLI = () => {
  const args: any = yargs;
  // Add configs
  _.forEach(config, (v, k) => {
    args.option(k, {
      type: typeof v,
      default: v,
      required: false
    });
  });
  // Finalize
  const argv: any = args.help('help').argv;

  // Now apply to config
  _.merge(config, argv);

  // Apply some mandatory defaults
  if (!config.backchannelToken) {
    config.backchannelToken = randomstring.generate(64);
    logger.debug('Using random backchannelToken: ' + config.backchannelToken);
  }

  logger.debug('Final config:', config);
};

export default config;
