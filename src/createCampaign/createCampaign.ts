import { logger, MutationResolvers } from 'shared';

export const createCampaign: MutationResolvers['createCampaign'] = async (
  _,
  { name },
  { prisma },
) => {
  const campaign = await prisma.campaign.create({ data: { name } });

  logger.info(`Created new campaign - ${name}`);

  return {
    __typename: 'CreatedCampaign',
    id: campaign.id,
  };
};
