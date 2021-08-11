import { Types } from 'mongoose';
import { CampaignModel, PersistedCampaign, PersistedItem } from './model';
import { Campaign, Item } from './__generated__/schema-types';

const mapItemDatabaseModelToGql = (savedItem: PersistedItem): Item => ({
  __typename: 'Item',
  // eslint-disable-next-line no-underscore-dangle
  id: savedItem._id,
  name: savedItem.name,
  description: savedItem.description,
  quantity: savedItem.quantity ?? 1,
  notes: savedItem.notes,
  tags: savedItem.tags || [],
  // eslint-disable-next-line no-underscore-dangle
  createdAt: savedItem._id.getTimestamp().toISOString(),
  updatedAt: savedItem.updatedAt?.toISOString(),
});

export const mapDatabaseModelToGql = ({
  name,
  electrum,
  platinum,
  gold,
  silver,
  bronze,
  items: savedItems,
  _id: id,
}: PersistedCampaign): Campaign => {
  const items: Item[] = savedItems.map(mapItemDatabaseModelToGql);

  return {
    __typename: 'Campaign',
    id,
    name,
    items: items || [],
    electrum: electrum || 0,
    platinum: platinum || 0,
    gold: gold || 0,
    silver: silver || 0,
    copper: bronze || 0,
    createdAt: id.getTimestamp().toISOString(),
  };
};

export const getCampaignById = async (
  id: string,
): Promise<PersistedCampaign | null> => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const savedCampaign = await CampaignModel.findById(id);

  return savedCampaign;
};
