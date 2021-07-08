import { Types } from 'mongoose';
import { CampaignModel, PersistedCampaign } from './model';
import { Campaign, Item } from './__generated__/schema-types';

export const mapDatabaseModelToGql = ({
  name,
  gold,
  silver,
  bronze,
  items: savedItems,
  _id: id,
}: PersistedCampaign): Campaign => {
  const items: Item[] = savedItems.map((savedItem) => ({
    __typename: 'Item',
    // eslint-disable-next-line no-underscore-dangle
    id: savedItem._id,
    name: savedItem.name,
    description: savedItem.description,
  }));

  return {
    __typename: 'Campaign',
    id,
    name,
    items,
    gold,
    silver,
    bronze,
  };
};

export const getCampaignById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const savedCampaign = await CampaignModel.findById(id);

  return savedCampaign;
};