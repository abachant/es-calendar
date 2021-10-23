import { Context } from '@src/context';
import { RequestHandler } from '@src/server/common';

export function getUsers(ctx: Context): RequestHandler {
  return async (_req, res) => {
    const users = await ctx.models.User.findAll();

    res.json(users.map((user) => user.toJSON()));
  };
}
