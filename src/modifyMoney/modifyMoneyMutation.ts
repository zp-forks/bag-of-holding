import {
  Campaign,
  CampaignNotFound,
  getCampaignById,
  logger,
  mapDatabaseModelToGql,
  MoneyModification,
  MutationResolvers,
} from '../shared';

export const modifyMoneyMutation: MutationResolvers['modifyMoney'] = async (
  _,
  { id, input },
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Modifying gold on campaign with ID ${id}`);

  const savedCampaign = await getCampaignById(id);

  if (!savedCampaign) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  if (input.modification === MoneyModification.ADD) {
    savedCampaign.gold += input.gold;
    savedCampaign.silver += input.silver;
    savedCampaign.bronze += input.bronze;
  } else {
    savedCampaign.gold -= input.gold;
    savedCampaign.silver -= input.silver;
    savedCampaign.bronze -= input.bronze;
  }

  savedCampaign.save();

  return mapDatabaseModelToGql(savedCampaign);
};
