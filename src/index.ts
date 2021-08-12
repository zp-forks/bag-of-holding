import { PrismaClient } from '@prisma/client';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { config } from 'dotenv';
import { resolvers } from './resolvers';
import { logger } from './shared';
import { typeDefs } from './typeDefs';

config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  logger.debug('Connected to database');
});

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: { prisma },
});

server
  .listen({ port: process.env.PORT || 4000, cors: false })
  .then(({ url }) => {
    logger.info(`🚀  Server ready at ${url}`);
  });
