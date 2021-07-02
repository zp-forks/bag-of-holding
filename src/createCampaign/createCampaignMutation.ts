import {
  CampaignModel,
  CreatedCampaign,
  logger,
  MutationResolvers,
} from '../shared';

export const createCampaignMutation: MutationResolvers['createCampaign'] =
  async (_, { name }): Promise<CreatedCampaign> => {
    const campaignToSave = new CampaignModel({
      name,
      gold: 0,
      silver: 0,
      bronze: 0,
      items: [],
    });

    const savedCampaign = await campaignToSave.save();

    logger.info(`Created new campaign - ${name}`);

    return {
      __typename: 'CreatedCampaign',
      id: savedCampaign._id,
    };
  };