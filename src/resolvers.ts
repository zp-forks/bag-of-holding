import { createCampaignMutation } from './createCampaign';
import { fetchCampaignQuery } from './fetchCampaign';
import { listCampaignsQuery } from './listCampaigns';
import { Resolvers } from './shared';

export const resolvers: Resolvers = {
  Mutation: {
    createCampaign: createCampaignMutation,
  },
  Query: {
    listCampaigns: listCampaignsQuery,
    fetchCampaign: fetchCampaignQuery,
  },
};
