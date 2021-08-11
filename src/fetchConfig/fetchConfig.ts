/* eslint-disable object-curly-newline */
import {
  CampaignConfig,
  CampaignResolvers,
  ConfigModel,
  logger,
} from '../shared';

export const fetchConfig: CampaignResolvers['config'] = async ({
  id,
}): Promise<CampaignConfig | null> => {
  logger.info(`Fetching config for campaign with ID ${id}`);

  const campaign = await ConfigModel.findOne({ campaignId: id });

  if (!campaign) return null;

  return {
    __typename: 'CampaignConfig',
    // eslint-disable-next-line no-underscore-dangle
    id: campaign._id,
  };
};
