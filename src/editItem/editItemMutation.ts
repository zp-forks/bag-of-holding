import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  InvalidInput,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
  prepareCampaignForSave,
} from '../shared';
import { modifyItem } from './item';

export const editItemMutation: MutationResolvers['editItem'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound | InvalidInput> => {
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

  modifyItem(savedCampaign.items, input);
  prepareCampaignForSave(savedCampaign);

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
