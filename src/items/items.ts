import { Item as PItem } from '@prisma/client';
import { CampaignResolvers, Item, logger } from 'shared';

const toGql = (item: PItem): Item => ({
  __typename: 'Item',
  ...item,
});

export const listItems: CampaignResolvers['items'] = async (
  { id: campaignId },
  _,
  { prisma },
): Promise<Item[]> => {
  const items = await prisma.item.findMany({ where: { campaignId } });

  logger.info(`Listing all items for campaign ${campaignId}`);

  return items.map(toGql);
};
