import { MutationResolvers } from 'shared';

export const editUser: MutationResolvers['editUser'] = async (
  _,
  { input },
  { prisma, userId },
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: input,
    });
    return { ...user, __typename: 'User', campaignCount: 0, campaigns: [] };
  } catch (err) {
    return {
      __typename: 'UserNotFound',
      message: `User with ID ${userId} not found`,
    };
  }
};
