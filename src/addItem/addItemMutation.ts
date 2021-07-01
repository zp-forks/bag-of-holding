import { Types } from 'mongoose';
import {
  Campaign,
  CampaignModel,
  CampaignNotFound,
  Item,
  logger,
  MutationResolvers,
} from '../shared';

export const addItemMutation: MutationResolvers['addItem'] = async (
  _,
  { id, item }
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Fetching campaign with ID ${id}`);

  if (!Types.ObjectId.isValid(id)) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  const savedCampaign = await CampaignModel.findById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  savedCampaign.items.push({
    name: item.name,
    description: item.description ?? undefined,
  });

  savedCampaign.save();

  const { name, gold, silver, bronze, items: savedItems } = savedCampaign;
  const items: Item[] = savedItems.map((savedItem) => ({
    __typename: 'Item',
    name: savedItem.name,
    description: savedItem.description,
  }));

  return {
    __typename: 'Campaign',
    id: savedCampaign._id,
    name,
    items,
    gold,
    silver,
    bronze,
  };
};
