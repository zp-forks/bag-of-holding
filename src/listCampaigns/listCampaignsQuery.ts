import {
  Campaign,
  CampaignModel,
  Item,
  logger,
  QueryResolvers,
} from '../shared';

export const listCampaignsQuery: QueryResolvers['listCampaigns'] =
  async (): Promise<Campaign[]> => {
    const savedCampaigns = await CampaignModel.find();

    logger.info('Fetching all campaigns');

    const campaigns: Campaign[] = savedCampaigns.map((savedCampaign) => {
      const { name, gold, silver, bronze, items: savedItems } = savedCampaign;
      const items: Item[] = savedItems.map((savedItem) => ({
        __typename: 'Item',
        name: savedItem.name,
        description: savedItem.description,
      }));

      return {
        __typename: 'Campaign',
        id: savedCampaign._id,
        name,
        items,
        gold,
        silver,
        bronze,
      };
    });

    return campaigns;
  };
