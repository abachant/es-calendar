import express from 'express';

import { asyncHandler } from '@src/server/common';
import { Context } from '@src/context';
import { getUsers } from './users';

export default function api(ctx: Context): express.Router {
  const router = express.Router();

  router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');

    next();
  });

  router.get('/users', asyncHandler(getUsers(ctx)));

  return router;
}
