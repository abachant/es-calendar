import http from 'http';
import path from 'path';
import fs from 'fs';
import express from 'express';
import { createTerminus } from '@godaddy/terminus';
import compression from 'compression';

import * as constants from '@src/constants';
import { Context } from '@src/context';
import delay from '@src/common/delay';
import { asyncHandler } from './common';
import requestLogger from './middleware/request-logger';
import errorHandler from './middleware/error-handler';
import indexPage from './handlers/index-page';
import api from './handlers/api';

const fsPromises = fs.promises;

async function getIndexHtml(indexHtmlPath: string): Promise<string> {
  let indexHtml: string | void;

  while (!indexHtml) {
    try {
      indexHtml = await fsPromises.readFile(indexHtmlPath, { encoding: 'utf8' });
    } catch (e) {
      await delay(1000);
    }
  }

  return indexHtml;
}

export async function createServer(ctx: Context): Promise<http.Server> {
  const frontendDir = path.join(ctx.config.workDir, 'frontend');
  const staticDir = path.join(frontendDir, 'dist/frontend');
  const publicDir = path.join(frontendDir, 'public');
  const indexHtml = await getIndexHtml(path.join(staticDir, 'index.ejs'));

  const app = express();

  app.use(express.json());

  app.disable('x-powered-by');

  app.use(compression());

  app.use(
    express.static(staticDir, {
      cacheControl: false,
      index: false,
      setHeaders(res) {
        if (!ctx.config.isDev) {
          res.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
        }
      },
    })
  );

  // Public directory is served from firebase hosting outside of dev.
  if (ctx.config.isDev) {
    app.use(express.static(publicDir));

    const [livereload, connectLivereload] = await Promise.all([import('livereload'), import('connect-livereload')]);
    const livereloadServer = livereload.createServer();

    livereloadServer.watch([staticDir, publicDir]);

    app.use(
      connectLivereload.default({
        port: 35729,
      })
    );
  }

  app.use(
    requestLogger(ctx.logger, {
      responseWhitelist: [constants.RES_PROP_STATUS_CODE, constants.RES_PROP_BODY],
      responseFilter: (res, propName) => {
        if (propName === constants.RES_PROP_STATUS_CODE) {
          return res[propName];
        }

        if (propName === constants.RES_PROP_BODY && res.statusCode >= constants.STATUS_CODE_INTERNAL_ERROR) {
          return res[propName];
        }
      },
    })
  );

  app.use('/api', api(ctx));

  app.use('*', asyncHandler(indexPage(ctx, indexHtml)));

  app.use(errorHandler(ctx.logger));

  const server = http.createServer(app);

  createTerminus(server, {
    logger: ctx.logger.error.bind(ctx.logger),
    healthChecks: {
      '/healthz': async () => {},
    },
    timeout: Infinity,
    async onSignal(): Promise<void> {
      ctx.logger.info('Received shutdown signal.');
    },
    async onShutdown(): Promise<void> {
      ctx.logger.info('Completed shutdown.');
    },
    async beforeShutdown() {
      if (ctx.config.isDev) {
        return;
      }

      return delay(5000);
    },
  });

  return server;
}
