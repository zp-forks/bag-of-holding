import { MoneyModification } from '../shared';
import { modifyMoney } from './modifyMoney';

const update = jest.fn();

const prisma = {
  campaign: {
    update,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, accessToken: '123' };

describe('modifyMoney', () => {
  it('adds money', async () => {
    update.mockResolvedValueOnce([]);

    await modifyMoney!(
      {},
      {
        campaignId: 'campaign-id',
        input: {
          copper: 1,
          electrum: 2,
          gold: 3,
          modification: MoneyModification.ADD,
          platinum: 4,
          silver: 5,
        },
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        copper: { increment: 1 },
        electrum: { increment: 2 },
        gold: { increment: 3 },
        platinum: { increment: 4 },
        silver: { increment: 5 },
      },
      where: { id: 'campaign-id' },
    });
  });

  it('deducts money', async () => {
    update.mockResolvedValueOnce([]);

    await modifyMoney!(
      {},
      {
        campaignId: 'campaign-id',
        input: {
          copper: 1,
          electrum: 2,
          gold: 3,
          modification: MoneyModification.DEDUCT,
          platinum: 4,
          silver: 5,
        },
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        copper: { decrement: 1 },
        electrum: { decrement: 2 },
        gold: { decrement: 3 },
        platinum: { decrement: 4 },
        silver: { decrement: 5 },
      },
      where: { id: 'campaign-id' },
    });
  });

  it('returns a campaign', async () => {
    update.mockResolvedValueOnce({ name: 'name' });

    const result = await modifyMoney!(
      {},
      {
        campaignId: 'campaign-id',
        input: {
          copper: 1,
          electrum: 2,
          gold: 3,
          modification: MoneyModification.DEDUCT,
          platinum: 4,
          silver: 5,
        },
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'Campaign',
      name: 'name',
      items: [],
    });
  });

  it('returns campaign not found when db call throws', async () => {
    update.mockRejectedValueOnce(new Error());

    const result = await modifyMoney!(
      {},
      {
        campaignId: 'campaign-id',
        input: {
          copper: 1,
          electrum: 2,
          gold: 3,
          modification: MoneyModification.DEDUCT,
          platinum: 4,
          silver: 5,
        },
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'CampaignNotFound',
      message: 'Campaign with ID campaign-id not found',
    });
  });
});
