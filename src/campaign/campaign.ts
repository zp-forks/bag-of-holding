import { FetchCampaignResult, logger, QueryResolvers } from '../shared';

export const fetchCampaign: QueryResolvers['campaign'] = async (
  _,
  { campaignId },
  { prisma },
): Promise<FetchCampaignResult> => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      rejectOnNotFound: true,
    });

    logger.info(`Fetched campaign ${campaignId}`);

    return {
      __typename: 'Campaign',
      ...campaign,
    };
  } catch {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} does not exist`,
    };
  }
};
