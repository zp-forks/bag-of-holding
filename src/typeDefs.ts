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

  type CampaignNotFound {
    message: String!
  }

  input AddItemInput {
    name: String!
    description: String
  }

  union FetchCampaignResult = Campaign | CampaignNotFound
  union AddItemResult = Campaign | CampaignNotFound

  type Query {
    listCampaigns: [Campaign]!
    fetchCampaign(id: ID!): FetchCampaignResult
  }

  type Mutation {
    createCampaign(name: String!): CreatedCampaign!
    addItem(id: ID!, item: AddItemInput!): AddItemResult
  }
`;
