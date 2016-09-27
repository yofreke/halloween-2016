import * as winston from 'winston';


const LOG_LEVEL = 'debug';


const getLogger = (name): winston.LoggerInstance => {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        timestamp: true,
        colorize: true,
        level: LOG_LEVEL
      })
    ]
  });
};


export default getLogger;
