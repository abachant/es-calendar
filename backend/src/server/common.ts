import { NextFunction, Request, Response, RequestHandler as ExpressRequestHandler } from 'express';

export type RequestHandler = (req: Request, res: Response) => Promise<boolean | void>;

export function asyncHandler(handler: RequestHandler): ExpressRequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res);

      if (result) {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}
