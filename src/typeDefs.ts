import { gql } from 'apollo-server';

export const typeDefs = gql`
  type CreatedCampaign {
    id: ID!
  }

  type Item {
    id: ID!
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

  enum MoneyModification {
    ADD
    DEDUCT
  }

  input AddItemInput {
    name: String!
    description: String
  }

  input RemoveItemInput {
    """
    ID of the item to be removed
    """
    id: ID!
  }

  input ModifyMoneyInput {
    modification: MoneyModification!
    gold: Int!
    silver: Int!
    bronze: Int!
  }

  union FetchCampaignResult = Campaign | CampaignNotFound
  union AddItemResult = Campaign | CampaignNotFound
  union RemoveItemResult = Campaign | CampaignNotFound
  union ModifyMoneyResult = Campaign | CampaignNotFound

  type Query {
    listCampaigns: [Campaign]!
    fetchCampaign(id: ID!): FetchCampaignResult!
  }

  type Mutation {
    createCampaign(name: String!): CreatedCampaign!
    addItem(id: ID!, input: AddItemInput!): AddItemResult!
    removeItem(id: ID!, input: RemoveItemInput!): RemoveItemResult!
    modifyMoney(id: ID!, input: ModifyMoneyInput!): ModifyMoneyResult!
  }
`;
