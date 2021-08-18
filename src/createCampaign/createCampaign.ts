import { logger, MutationResolvers } from 'shared';

export const createCampaign: MutationResolvers['createCampaign'] = async (
  _,
  { name },
  { prisma, userId },
) => {
  try {
    const campaign = await prisma.campaign.create({
      data: { name, users: { connect: { id: userId } } },
    });

    logger.info(`Created new campaign - ${name}`);

    return {
      __typename: 'Campaign',
      ...campaign,
      items: [],
      users: [],
      itemCount: 0,
      userCount: 0,
    };
  } catch {
    return {
      __typename: 'InvalidInput',
      message: 'You need to be signed in to create a campaign',
    };
  }
};
