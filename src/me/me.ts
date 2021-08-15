import { logger, QueryResolvers } from 'shared';

export const me: QueryResolvers['me'] = async (
  _,
  __,
  { prisma, accessToken: userId },
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      __typename: 'UserNotFound',
      message: `User with ID ${userId} not found`,
    };
  }

  logger.info(`Fetched user ${userId}`);

  return {
    ...user,
    __typename: 'User',
    campaigns: [],
  };
};
