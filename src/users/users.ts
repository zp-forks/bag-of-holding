import { CampaignResolvers, logger } from 'shared';

export const users: CampaignResolvers['users'] = async (
  { id },
  _,
  { prisma },
) => {
  const foundUsers = await prisma.user.findMany({
    where: { campaigns: { some: { id } } },
  });

  logger.info(`Listing all users for campaign ${id}`);

  return foundUsers.map((user) => ({
    ...user,
    __typename: 'User',
    campaigns: [],
  }));
};
