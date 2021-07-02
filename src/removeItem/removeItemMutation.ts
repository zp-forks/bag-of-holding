import { Types } from 'mongoose';
import {
  Campaign,
  CampaignModel,
  CampaignNotFound,
  getCampaignById,
  Item,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
} from '../shared';

export const removeItemMutation: MutationResolvers['removeItem'] = async (
  _,
  { id, input }
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Removing item from campaign with ID ${id}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  const itemToRemove = savedCampaign.items.find(
    (item) => item._id.toString() === input.id
  );

  if (itemToRemove) {
    const spliceIndex = savedCampaign.items.indexOf(itemToRemove);
    savedCampaign.items.splice(spliceIndex, 1);
    await savedCampaign.save();
  }

  return mapDatabaseModelToGql(savedCampaign);
};
