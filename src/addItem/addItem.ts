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
  const { campaign } = await prisma.item.create({
    data: { campaignId, ...mapToPrisma(input) },
    include: { campaign: true },
  });

  if (!campaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} does not exist`,
    };
  }

  logger.info(`Added item with to campaign with ID ${campaignId}`);

  return {
    __typename: 'Campaign',
    ...campaign,
  };
};
