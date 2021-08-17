import { logger, MutationResolvers } from 'shared';

export const addItem: MutationResolvers['addItem'] = async (
  _,
  { campaignId, input: { tags, quantity, ...input } },
  { prisma },
) => {
  try {
    const { campaign } = await prisma.item.create({
      data: {
        campaignId,
        ...input,
        quantity: quantity ?? undefined,
        tags: tags ?? undefined,
      },
      include: { campaign: true },
    });

    logger.info(`Added item with to campaign with ID ${campaignId}`);

    return {
      __typename: 'Campaign',
      ...campaign,
      items: [],
      users: [],
      itemCount: 0,
    };
  } catch {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} does not exist`,
    };
  }
};
