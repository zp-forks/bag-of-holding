import { MutationResolvers } from 'shared';

export const login: MutationResolvers['login'] = async (
  _,
  { externalId },
  { prisma },
) => {
  const user = await prisma.user.upsert({
    where: {
      externalId,
    },
    create: {
      externalId,
      lastLogin: new Date(),
    },
    update: {
      lastLogin: new Date(),
    },
  });
  return {
    ...user,
    __typename: 'User',
    campaigns: [],
  };
};
