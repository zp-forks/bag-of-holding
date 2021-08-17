import { CampaignResolvers, logger } from 'shared';

export const itemCount: CampaignResolvers['itemCount'] = async (
  { id },
  _,
  { prisma },
) => {
  const count = await prisma.item.count({ where: { campaignId: id } });

  logger.info(`Fetching item count for Campaign ${id}`);

  return count;
};
