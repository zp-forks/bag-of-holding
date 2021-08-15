import { config } from 'dotenv';
import { logger } from 'shared';
import { server } from 'server';

config();

server
  .listen({ port: process.env.PORT || 4000, cors: false })
  .then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`);
  });
