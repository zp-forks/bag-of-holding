import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  InvalidInput,
  ItemNotFound,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
} from '../shared';
import { modifyItem } from './item';

export const editItemMutation: MutationResolvers['editItem'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound | InvalidInput | ItemNotFound> => {
  logger.info(`Updating item: ${input.id} from campaign ${id}`);

  if (input.quantity && input.quantity < 0) {
    return {
      __typename: 'InvalidInput',
      message: 'Quantity cannot be below 0',
    };
  }

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  const item = modifyItem(savedCampaign.items, input);

  if (!item) {
    return {
      __typename: 'ItemNotFound',
      message: `No item found with ID ${input.id}`,
    };
  }

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
