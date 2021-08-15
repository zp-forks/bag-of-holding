import { PrismaClient } from '@prisma/client';
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

export const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: { prisma: new PrismaClient() },
});
