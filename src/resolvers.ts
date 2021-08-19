import { addItem } from 'addItem';
import { addTag } from 'addTag';
import { joinCampaign } from 'joinCampaign';
import { campaign } from 'campaign';
import { campaigns, userCampaigns } from 'campaigns';
import { campaignCount, itemCount } from 'count';
import { userCount } from 'count/userCount';
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
import { users } from 'users';
import { editUser } from 'editUser';

export const resolvers: Resolvers = {
  Campaign: {
    items,
    users,
    itemCount,
    userCount,
  },
  Mutation: {
    createCampaign,
    modifyMoney,
    addItem,
    removeItem,
    editItem,
    addTag,
    removeTag,
    login,
    joinCampaign,
    editUser,
  },
  Query: {
    campaigns,
    campaign,
    item,
    me,
  },
  User: {
    campaigns: userCampaigns,
    campaignCount,
  },
  Date: dateScalar,
};
