import { Logger } from 'winston';
import { LoggerOptionsWithWinstonInstance } from 'express-winston';

export const baseLoggerMiddlewareOptions = (logger: Logger): LoggerOptionsWithWinstonInstance => ({
  winstonInstance: logger,
  // Exclude sensitive headers.
  headerBlacklist: ['cookie', 'authorization'],
});
