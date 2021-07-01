import { addItemMutation } from './addItem';
import { createCampaignMutation } from './createCampaign';
import { fetchCampaignQuery } from './fetchCampaign';
import { listCampaignsQuery } from './listCampaigns';
import { modifyMoneyMutation } from './modifyMoney';
import { Resolvers } from './shared';

export const resolvers: Resolvers = {
  Mutation: {
    createCampaign: createCampaignMutation,
    addItem: addItemMutation,
    modifyMoney: modifyMoneyMutation,
  },
  Query: {
    listCampaigns: listCampaignsQuery,
    fetchCampaign: fetchCampaignQuery,
  },
};
