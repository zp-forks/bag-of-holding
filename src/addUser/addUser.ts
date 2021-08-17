import { MutationResolvers } from 'shared';

export const addUser: MutationResolvers['addUser'] = async (
  _,
  { campaignId },
  { prisma, userId },
) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: { users: { connect: { id: userId } } },
    });
    return { __typename: 'Campaign', ...campaign, items: [] };
  } catch (error) {
    // error code for connected object not being found
    if (error.code === 'P2025') {
      return {
        __typename: 'UserNotFound',
        message: `User with ID ${userId} not found`,
      };
    }
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} not found`,
    };
  }
};
