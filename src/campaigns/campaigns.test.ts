import { listCampaigns } from './campaigns';

const findMany = jest.fn();

const prisma = {
  campaign: {
    findMany,
  },
} as any;

const resolveInfo: any = {};

describe('campaigns', () => {
  it('calls find many with correct values', async () => {
    findMany.mockResolvedValueOnce([]);

    await listCampaigns!(
      {},
      {
        campaignId: 'campaign-id',
      },
      { prisma },
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
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual([
      { __typename: 'Campaign', name: 'name' },
      { __typename: 'Campaign', name: 'name2' },
    ]);
  });
});