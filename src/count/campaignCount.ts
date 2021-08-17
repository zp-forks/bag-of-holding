import { logger, UserResolvers } from 'shared';

export const campaignCount: UserResolvers['campaignCount'] = async (
  { id },
  _,
  { prisma },
) => {
  const count = await prisma.campaign.count({
    where: { users: { some: { id } } },
  });

  logger.info(`Fetching campaign count for User ${id}`);

  return count;
};
