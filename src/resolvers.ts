import { createCampaignMutation } from './createCampaign';
import { fetchCampaignQuery } from './fetchCampaign';
import { listCampaignsQuery } from './listCampaigns';
import { addItemMutation } from './addItem';
import { Resolvers } from './shared';

export const resolvers: Resolvers = {
  Mutation: {
    createCampaign: createCampaignMutation,
    addItem: addItemMutation,
  },
  Query: {
    listCampaigns: listCampaignsQuery,
    fetchCampaign: fetchCampaignQuery,
  },
};
