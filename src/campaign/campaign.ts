import { logger, QueryResolvers } from 'shared';

export const fetchCampaign: QueryResolvers['campaign'] = async (
  _,
  { campaignId },
  { prisma },
) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      rejectOnNotFound: true,
    });

    logger.info(`Fetched campaign ${campaignId}`);

    return {
      __typename: 'Campaign',
      ...campaign,
      items: [],
      users: [],
      itemCount: 0,
    };
  } catch {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} not found`,
    };
  }
};
