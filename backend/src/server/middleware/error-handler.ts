import expressWinston from 'express-winston';
import { Logger } from 'winston';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import * as errors from '@src/errors';
import * as constants from '@src/constants';

import { baseLoggerMiddlewareOptions } from './common';

interface ErrorResponse {
  status: number;
  title: string;
  code?: number;
}

function createErrorId() {
  return Math.round(Math.random() * 100000000);
}

function mapErrorToResponse(error: Error): ErrorResponse {
  if (error instanceof errors.AuthenticationError) {
    return {
      status: constants.STATUS_CODE_AUTHENTICATION_ERROR,
      title: error.message,
    };
  }

  if (error instanceof errors.AuthorizationError) {
    return {
      status: constants.STATUS_CODE_AUTHORIZATION_ERROR,
      title: error.message,
    };
  }

  if (error instanceof errors.ClientError) {
    return {
      status: constants.STATUS_CODE_BAD_REQUEST_ERROR,
      title: error.message,
      code: error.code,
    };
  }

  return {
    status: constants.STATUS_CODE_INTERNAL_ERROR,
    title: 'Internal Error',
  };
}

export default function errorHandler(logger: Logger): ErrorRequestHandler {
  const errorLogger = expressWinston.errorLogger({
    ...baseLoggerMiddlewareOptions(logger),
    msg: 'Caught error from route handler',
    level: (_req, res) => res.locals.errorLevel,
    skip: (_req, res) => res.locals.errorLevel === 'info',
  });

  return (error: Error, req: Request, res: Response, _next: NextFunction) => {
    const { status, ...rest } = mapErrorToResponse(error);
    const id = createErrorId();
    const level = status < constants.STATUS_CODE_INTERNAL_ERROR ? 'info' : 'error';

    res.locals.errorLevel = level;

    errorLogger(error, req, res, () => {
      res.status(status).json({
        errors: [
          {
            status,
            id,
            ...rest,
          },
        ],
      });
    });
  };
}
