import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { config } from 'dotenv';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const server = new ApolloServer({ schema });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
