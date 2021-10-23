import expressWinston, { BaseLoggerOptions } from 'express-winston';
import { Logger } from 'winston';
import { RequestHandler } from 'express';

import { baseLoggerMiddlewareOptions } from './common';

interface RequestLoggerOptions extends BaseLoggerOptions {
  routeType?: string;
}

export default function requestLogger(logger: Logger, options: RequestLoggerOptions = {}): RequestHandler {
  const { routeType, ...rest } = options;

  return expressWinston.logger({
    ...baseLoggerMiddlewareOptions(logger),
    // Skip logging if the wrong route type was specified. Route must set the
    // res.locals.routeType property.
    skip: (_req, res) => res.locals.routeType !== routeType,
    // Override message property so as not to log full URL which may contain a private token.
    msg: '{{req.method}} {{req.path}} {{res.statusCode}} {{res.responseTime}}ms',
    statusLevels: true,
    ...rest,
  });
}
