import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type CreatedCampaign {
    id: ID!
  }

  type Item {
    name: String!
    description: String
  }

  type Campaign {
    id: ID!
    name: String!
    gold: Int!
    silver: Int!
    bronze: Int!
    items: [Item!]!
  }

  type Query {
    listCampaigns: [Campaign]!
  }

  type Mutation {
    createCampaign(name: String!): CreatedCampaign!
  }
`;
