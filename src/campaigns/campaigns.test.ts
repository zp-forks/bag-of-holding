import { listCampaigns } from './campaigns';

const findMany = jest.fn();

const prisma = {
  campaign: {
    findMany,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('campaigns', () => {
  it('calls find many with correct values', async () => {
    findMany.mockResolvedValueOnce([]);

    await listCampaigns!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(findMany).toHaveBeenCalledWith();
  });

  it('returns a list of campaigns', async () => {
    findMany.mockResolvedValueOnce([{ name: 'name' }, { name: 'name2' }]);

    const result = await listCampaigns!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual([
      {
        __typename: 'Campaign',
        name: 'name',
        items: [],
        users: [],
        itemCount: 0,
        userCount: 0,
      },
      {
        __typename: 'Campaign',
        name: 'name2',
        items: [],
        users: [],
        itemCount: 0,
        userCount: 0,
      },
    ]);
  });
});
