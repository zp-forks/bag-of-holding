import {
  logger,
  ModifyMoneyResult,
  MoneyModification,
  MutationResolvers,
} from '../shared';

export const modifyMoney: MutationResolvers['modifyMoney'] = async (
  _,
  { campaignId, input },
  { prisma },
): Promise<ModifyMoneyResult> => {
  let data = {};

  if (input.modification === MoneyModification.ADD) {
    data = {
      platinum: { increment: input.platinum },
      gold: { increment: input.gold },
      electrum: { increment: input.electrum },
      silver: { increment: input.silver },
      copper: { increment: input.copper },
    };
  } else {
    data = {
      platinum: { decrement: input.platinum },
      gold: { decrement: input.gold },
      electrum: { decrement: input.electrum },
      silver: { decrement: input.silver },
      copper: { decrement: input.copper },
    };
  }

  try {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data,
    });

    logger.info(`Updated currency on campaign ${campaignId}`);
    return { __typename: 'Campaign', ...campaign, items: [] };
  } catch {
    return {
      __typename: 'CampaignNotFound',
      message: `Campaign with ID ${campaignId} not found`,
    };
  }
};
