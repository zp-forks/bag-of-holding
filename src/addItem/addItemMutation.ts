import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  MutationResolvers,
  prepareCampaignForSave,
} from '../shared';

export const addItemMutation: MutationResolvers['addItem'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Adding item to campaign with ID ${id}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  logger.info(input.quantity);

  savedCampaign.items.push({
    name: input.name,
    description: input.description ?? undefined,
    quantity: input.quantity ?? 1,
    notes: input.notes ?? undefined,
    tags: input.tags,
  } as any);

  prepareCampaignForSave(savedCampaign);

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
