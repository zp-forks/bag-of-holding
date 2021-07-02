import { Types } from 'mongoose';
import {
  Campaign,
  CampaignModel,
  CampaignNotFound,
  Item,
  logger,
  QueryResolvers,
} from '../shared';

export const fetchCampaignQuery: QueryResolvers['fetchCampaign'] = async (
  _,
  { id }
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

  const { name, gold, silver, bronze, items: savedItems } = savedCampaign;
  const items: Item[] = savedItems.map((savedItem) => ({
    __typename: 'Item',
    id: savedItem._id,
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
