import { createCampaignMutation } from './createCampaign';

export const resolvers = {
  Mutation: {
    createCampaign: createCampaignMutation,
  },
};
