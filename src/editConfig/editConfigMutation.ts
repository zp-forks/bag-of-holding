import {
  CampaignConfig,
  CampaignNotFound,
  ConfigModel,
  MutationResolvers,
} from '../shared';
import { createCampaignConfig } from './campaignConfig';

export const editConfigMutation: MutationResolvers['editConfig'] = async (
  _,
  { id },
): Promise<CampaignConfig | CampaignNotFound> => {
  const campaignConfig = await ConfigModel.findOne({ campaignId: id });

  if (campaignConfig) {
    return {
      __typename: 'CampaignConfig',
      // eslint-disable-next-line no-underscore-dangle
      id: campaignConfig._id,
      updatedAt: campaignConfig.updatedAt?.toISOString(),
    };
  }

  try {
    const config = await createCampaignConfig(id);
    return {
      __typename: 'CampaignConfig',
      // eslint-disable-next-line no-underscore-dangle
      id: config._id,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign not found for ID ${id}`,
    };
  }
};
