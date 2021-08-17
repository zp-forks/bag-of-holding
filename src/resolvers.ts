import { addItem } from 'addItem';
import { addTag } from 'addTag';
import { campaign } from 'campaign';
import { campaigns, userCampaigns } from 'campaigns';
import { createCampaign } from 'createCampaign';
import { editItem } from 'editItem';
import { item } from 'item';
import { items } from 'items';
import { login } from 'login';
import { me } from 'me';
import { modifyMoney } from 'modifyMoney';
import { removeItem } from 'removeItem';
import { removeTag } from 'removeTag';
import { dateScalar, Resolvers } from 'shared';
import { addUser } from 'addUser';
import { users } from 'users';

export const resolvers: Resolvers = {
  Campaign: { items, users },
  Mutation: {
    createCampaign,
    modifyMoney,
    addItem,
    removeItem,
    editItem,
    addTag,
    removeTag,
    login,
    addUser,
  },
  Query: {
    campaigns,
    campaign,
    item,
    me,
  },
  User: {
    campaigns: userCampaigns,
  },
  Date: dateScalar,
};
