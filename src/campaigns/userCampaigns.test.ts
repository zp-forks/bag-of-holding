import { userCampaigns } from './userCampaigns';

const findMany = jest.fn();

const prisma = {
  campaign: {
    findMany,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('userCampaigns', () => {
  it('calls find many with correct values', async () => {
    findMany.mockResolvedValueOnce([]);

    await userCampaigns!({ id: 'user-id' } as any, {}, context, resolveInfo);

    expect(findMany).toHaveBeenCalledWith({
      where: { users: { some: { id: 'user-id' } } },
    });
  });

  it('returns a list of campaigns', async () => {
    findMany.mockResolvedValueOnce([{ name: 'name' }, { name: 'name2' }]);

    const result = await userCampaigns!(
      { id: 'user-id' } as any,
      {},
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
      },
      {
        __typename: 'Campaign',
        name: 'name2',
        items: [],
        users: [],
        itemCount: 0,
      },
    ]);
  });
});
