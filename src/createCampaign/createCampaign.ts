import { CreatedCampaign, logger, MutationResolvers } from '../shared';

export const createCampaign: MutationResolvers['createCampaign'] = async (
  _,
  { name },
  { prisma },
): Promise<CreatedCampaign> => {
  const campaign = await prisma.campaign.create({ data: { name } });

  logger.info(`Created new campaign - ${name}`);

  return {
    __typename: 'CreatedCampaign',
    id: campaign.id,
  };
};
