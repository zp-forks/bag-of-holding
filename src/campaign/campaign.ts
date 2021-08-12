import { FetchCampaignResult, logger, QueryResolvers } from '../shared';

export const fetchCampaign: QueryResolvers['campaign'] = async (
  _,
  { campaignId },
  { prisma },
): Promise<FetchCampaignResult> => {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} does not exist`,
    };
  }

  logger.info(`Fetched campaign ${campaignId}`);

  return {
    __typename: 'Campaign',
    ...campaign,
  };
};
