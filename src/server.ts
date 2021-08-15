import { PrismaClient } from '@prisma/client';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { IncomingHttpHeaders } from 'http';
import { resolvers } from 'resolvers';
import { typeDefs } from 'typeDefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const extractUserId = (headers: IncomingHttpHeaders) => {
  const header = headers['bag-user-id'];
  return header || '';
};

export const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: ({ req }) => {
    const userId = extractUserId(req.headers);
    return { prisma: new PrismaClient(), userId };
  },
});
