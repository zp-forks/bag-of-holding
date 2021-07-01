import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Dummy {
    value: String
  }

  type Query {
    dummy: [Dummy]
  }
`;
