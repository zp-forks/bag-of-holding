import {
  AddItemInput,
  AddItemResult,
  logger,
  MutationResolvers,
} from '../shared';

const mapToPrisma = (input: AddItemInput) => ({
  name: input.name,
  description: input.description ?? undefined,
  quantity: input.quantity ?? undefined,
  notes: input.notes ?? undefined,
  tags: input.tags ?? undefined,
});

export const addItemMutation: MutationResolvers['addItem'] = async (
  _,
  { campaignId, input },
  { prisma },
): Promise<AddItemResult> => {
  const updatedCampaign = await prisma.campaign.update({
    data: { items: { create: mapToPrisma(input) } },
    where: { id: campaignId },
  });

  if (!updatedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} does not exist`,
    };
  }

  logger.info(`Added item with to campaign with ID ${campaignId}`);

  return {
    __typename: 'Campaign',
    ...updatedCampaign,
  };
};
