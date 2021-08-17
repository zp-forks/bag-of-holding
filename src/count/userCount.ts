import { CampaignResolvers, logger } from 'shared';

export const userCount: CampaignResolvers['userCount'] = async (
  { id },
  _,
  { prisma },
) => {
  const count = await prisma.user.count({
    where: { campaigns: { some: { id } } },
  });

  logger.info(`Fetching user count for Campaign ${id}`);

  return count;
};
