import { addItemMutation } from './addItem';
import { addTagMutation } from './addTag';
import { createCampaignMutation } from './createCampaign';
import { editItemMutation } from './editItem';
import { fetchCampaignQuery } from './fetchCampaign';
import { listCampaignsQuery } from './listCampaigns';
import { modifyMoneyMutation } from './modifyMoney';
import { removeItemMutation } from './removeItem';
import { removeTagMutation } from './removeTag';
import { Resolvers } from './shared';

export const resolvers: Resolvers = {
  Mutation: {
    createCampaign: createCampaignMutation,
    addItem: addItemMutation,
    modifyMoney: modifyMoneyMutation,
    removeItem: removeItemMutation,
    editItem: editItemMutation,
    addTag: addTagMutation,
    removeTag: removeTagMutation,
  },
  Query: {
    listCampaigns: listCampaignsQuery,
    fetchCampaign: fetchCampaignQuery,
  },
};
