import {
  AddTagResult,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
  prepareCampaignForSave,
} from '../shared';

export const removeTagMutation: MutationResolvers['addTag'] = async (
  _,
  { id, input: { itemId, tag } },
): Promise<AddTagResult> => {
  logger.info(`Removing tag from item with ID ${itemId}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  // eslint-disable-next-line no-underscore-dangle
  const savedItem = savedCampaign.items.find((item) => item._id.equals(itemId));

  if (!savedItem) {
    return {
      __typename: 'ItemNotFound',
      message: `No item with ID ${itemId} on campaign ${id}`,
    };
  }

  savedItem.tags = savedItem.tags?.filter((t) => t !== tag);

  prepareCampaignForSave(savedCampaign);

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
