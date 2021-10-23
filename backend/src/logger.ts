import { createLogger as createWinstonLogger, format, transports, Logger } from 'winston';

import { Config } from './config';

export { Logger } from 'winston';

const { combine, timestamp, simple, colorize, json, printf } = format;

const severity = printf((info) => {
  info.severity = info.level;

  return (info as unknown) as string;
});

export function createLogger(config: Config): Logger {
  return createWinstonLogger({
    level: config.isDev ? 'debug' : 'info',
    format: config.isDev ? combine(colorize(), timestamp(), simple()) : combine(severity, json()),
    transports: [new transports.Console()],
  });
}
