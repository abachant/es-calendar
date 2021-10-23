import { createContext } from './context';
import { createServer } from './server';

async function main() {
  const ctx = createContext();

  process.on('uncaughtException', (error: Error) => {
    ctx.logger.error(`Shutting down due to 'uncaughtException'`, {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  });

  process.on('unhandledRejection', (error: Error) => {
    ctx.logger.error(`Shutting down due to 'unhandledRejection'`, {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  });

  // Test the database connection.
  await ctx.databaseClient.authenticate();

  const server = await createServer(ctx);

  server.listen(ctx.config.port, (error?: Error) => {
    if (error) {
      ctx.logger.error('Server failed to start', { error });
      process.exit(1);
    }

    ctx.logger.info('Server started', {
      port: ctx.config.port,
      env: ctx.config.environment,
    });
  });
}

main();
