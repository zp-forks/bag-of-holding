import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { IncomingHttpHeaders } from 'http';
import { resolvers } from 'resolvers';
import { typeDefs } from 'typeDefs';

const extractUserId = (headers: IncomingHttpHeaders) => {
  const header = headers['bag-user-id'];
  return header || '';
};

const prisma = new PrismaClient();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => {
    const userId = extractUserId(req.headers);
    return { prisma, userId };
  },
});
