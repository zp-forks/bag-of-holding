import { ConfigModel, getCampaignById } from '../shared';

export const createCampaignConfig = async (campaignId: string) => {
  const campaign = await getCampaignById(campaignId);

  if (!campaign) throw new Error('no campaign');

  const campaignConfig = new ConfigModel({ campaignId });
  campaignConfig.save();
  return campaignConfig;
};
