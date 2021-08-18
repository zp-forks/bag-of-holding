import { fetchCampaign } from './campaign';

const findFirst = jest.fn();

const prisma = {
  campaign: {
    findFirst,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('campaign', () => {
  it('calls find unique with correct values', async () => {
    await fetchCampaign!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(findFirst).toHaveBeenCalledWith({
      where: { id: 'campaign-id', users: { some: { id: '123' } } },
      rejectOnNotFound: true,
    });
  });

  it('returns a campaign', async () => {
    findFirst.mockResolvedValueOnce({ name: 'name' });

    const result = await fetchCampaign!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'Campaign',
      name: 'name',
      items: [],
      users: [],
      itemCount: 0,
      userCount: 0,
    });
  });

  it('returns a campaign not found when db call throws', async () => {
    findFirst.mockRejectedValueOnce(new Error());

    const result = await fetchCampaign!(
      {},
      {
        campaignId: 'campaign-id',
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
