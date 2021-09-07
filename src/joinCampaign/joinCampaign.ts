import { MutationResolvers } from 'shared';

export const joinCampaign: MutationResolvers['joinCampaign'] = async (
  _,
  { campaignId },
  { prisma, userId },
) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: { users: { connect: { id: userId } } },
    });

    return {
      __typename: 'Campaign',
      ...campaign,
      items: [],
      users: [],
      itemCount: 0,
      userCount: 0,
    };
  } catch (error) {
    // error code for connected object not being found
    if ((error as any)?.code === 'P2025') {
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
