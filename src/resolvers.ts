import { addItem } from './addItem';
import { addTag } from './addTag';
import { campaign } from './campaign';
import { campaigns } from './campaigns';
import { createCampaign } from './createCampaign';
import { editItem } from './editItem';
import { item } from './item';
import { items } from './items';
import { modifyMoney } from './modifyMoney';
import { removeItem } from './removeItem';
import { removeTag } from './removeTag';
import { Resolvers } from './shared';
import { dateScalar } from './shared/dateScalar';

export const resolvers: Resolvers = {
  Campaign: { items },
  Mutation: {
    createCampaign,
    modifyMoney,
    addItem,
    removeItem,
    editItem,
    addTag,
    removeTag,
  },
  Query: {
    campaigns,
    campaign,
    item,
  },
  Date: dateScalar,
};
