import winston from 'winston';
import * as momentTz from 'moment-timezone';

import { configService } from '../configs';

const { json, timestamp, colorize, combine, align, printf, logstash } = winston.format;
const { Console, File } = winston.transports;
const timeStampFormat = momentTz.tz(configService.LOCAL_TIMEZONE).toString();
const loggerConsoleFormat = combine(
  timestamp({ format: timeStampFormat }),
  json(),
  colorize({ all: true }),
  align(),
  printf((log) => `[${log.timestamp}]: ${log.message}`),
);

//logFilter
const infoFilter = winston.format((log) => {
  return log.level === 'info' ? log : false;
});
const errorFilter = winston.format((log) => {
  return log.level === 'error' ? log : false;
});

const logger = winston.createLogger({
  level: configService.LOG_LEVEL,
  transports: [
    new Console({ format: loggerConsoleFormat }),
    new File({ filename: 'src/logs/info.log', format: combine(infoFilter(), json(), timestamp()) }),
    new File({ filename: 'src/logs/error.log', format: combine(errorFilter(), json(), timestamp()) }),
  ],
  exceptionHandlers: new File({ filename: 'src/logs/exception.log' }),
  rejectionHandlers: new File({ filename: 'src/logs/rejection.log' }),
});

export default logger;
