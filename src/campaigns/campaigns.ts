import { Campaign as PCampaign } from '@prisma/client';
import { Campaign, logger, QueryResolvers } from '../shared';

const toGql = (campaign: PCampaign): Campaign => ({
  __typename: 'Campaign',
  ...campaign,
});

export const listCampaigns: QueryResolvers['campaigns'] = async (
  _,
  __,
  { prisma },
): Promise<Campaign[]> => {
  const campaigns = await prisma.campaign.findMany();

  logger.info('Listing all campaigns');

  return campaigns.map(toGql);
};
