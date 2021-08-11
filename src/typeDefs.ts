import { gql } from 'apollo-server';

export const typeDefs = gql`
  type CreatedCampaign {
    id: ID!
  }

  type Item {
    id: ID!
    name: String!
    description: String
    quantity: Int!
    notes: String
    tags: [String!]!
    createdAt: String!
    updatedAt: String
  }

  type CampaignConfig {
    id: ID!
    updatedAt: String
  }

  type Campaign {
    id: ID!
    name: String!
    electrum: Int!
    platinum: Int!
    gold: Int!
    silver: Int!
    copper: Int!
    items: [Item!]!
    createdAt: String!
    config: CampaignConfig
  }

  type CampaignNotFound {
    message: String!
  }

  type ItemNotFound {
    message: String!
  }

  type InvalidInput {
    message: String!
  }

  enum MoneyModification {
    ADD
    DEDUCT
  }

  input AddItemInput {
    name: String!
    description: String
    quantity: Int
    notes: String
    tags: [String!]
  }

  input EditItemInput {
    id: ID!
    name: String
    description: String
    quantity: Int
    notes: String
    tags: [String!]
  }

  input RemoveItemInput {
    """
    ID of the item to be removed
    """
    id: ID!
  }

  input ModifyMoneyInput {
    modification: MoneyModification!
    electrum: Int!
    platinum: Int!
    gold: Int!
    silver: Int!
    copper: Int!
  }

  input ModifyTagsInput {
    itemId: ID!
    tag: String!
  }

  union FetchCampaignResult = Campaign | CampaignNotFound
  union AddItemResult = Campaign | CampaignNotFound
  union EditItemResult =
      Campaign
    | CampaignNotFound
    | InvalidInput
    | ItemNotFound
  union RemoveItemResult = Campaign | CampaignNotFound
  union ModifyMoneyResult = Campaign | CampaignNotFound
  union AddTagResult = Campaign | CampaignNotFound | ItemNotFound
  union RemoveTagResult = Campaign | CampaignNotFound | ItemNotFound
  union EditConfigResult = CampaignConfig | CampaignNotFound

  type Query {
    listCampaigns: [Campaign]!
    fetchCampaign(id: ID!): FetchCampaignResult!
  }

  type Mutation {
    createCampaign(name: String!): CreatedCampaign!
    addItem(id: ID!, input: AddItemInput!): AddItemResult!
    removeItem(id: ID!, input: RemoveItemInput!): RemoveItemResult!
    editItem(id: ID!, input: EditItemInput!): EditItemResult!
    modifyMoney(id: ID!, input: ModifyMoneyInput!): ModifyMoneyResult!
    addTag(id: ID!, input: ModifyTagsInput!): AddTagResult!
    removeTag(id: ID!, input: ModifyTagsInput!): RemoveTagResult!
    editConfig(id: ID!): EditConfigResult!
  }
`;
