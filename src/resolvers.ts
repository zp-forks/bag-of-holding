import { createCampaignMutation } from './createCampaign';
import { listCampaignsQuery } from './listCampaigns';

export const resolvers = {
  Mutation: {
    createCampaign: createCampaignMutation,
  },
  Query: {
    listCampaigns: listCampaignsQuery,
  },
};
