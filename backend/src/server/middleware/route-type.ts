import { RequestHandler } from 'express';

export default function routeType(type: string): RequestHandler {
  return (_req, res, next) => {
    res.locals.routeType = type;

    next();
  };
}
