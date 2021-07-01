import { Types } from 'mongoose';
import {
  Campaign,
  CampaignModel,
  CampaignNotFound,
  Item,
  logger,
  MoneyModification,
  MutationResolvers,
} from '../shared';

export const modifyMoneyMutation: MutationResolvers['modifyMoney'] = async (
  _,
  { id, input }
): Promise<Campaign | CampaignNotFound> => {
  logger.info(`Modifying gold on campaign with ID ${id}`);

  if (!Types.ObjectId.isValid(id)) {
    return {
      __typename: 'CampaignNotFound',
      message: `No campaign with ID ${id}`,
    };
  }

  const savedCampaign = await CampaignModel.findById(id);

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
};
