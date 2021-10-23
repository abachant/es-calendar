import ejs from 'ejs';

import { Context } from '@src/context';
import { RequestHandler } from '@src/server/common';

export default function indexPage(_ctx: Context, indexHtml: string): RequestHandler {
  return async (_req, res) => {
    res.send(ejs.render(indexHtml, {}));
  };
}
