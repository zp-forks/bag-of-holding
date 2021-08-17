import { users } from './users';

const findMany = jest.fn();

const prisma = {
  user: {
    findMany,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('users', () => {
  it('calls find many with correct values', async () => {
    findMany.mockResolvedValueOnce([]);

    await users!({ id: 'user-id' } as any, {}, context, resolveInfo);

    expect(findMany).toHaveBeenCalledWith({
      where: { campaigns: { some: { id: 'user-id' } } },
    });
  });

  it('returns a list of users', async () => {
    findMany.mockResolvedValueOnce([{ externalId: '1' }, { externalId: '2' }]);

    const result = await users!(
      { id: 'user-id' } as any,
      {},
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual([
      { __typename: 'User', externalId: '1', campaigns: [], campaignCount: 0 },
      { __typename: 'User', externalId: '2', campaigns: [], campaignCount: 0 },
    ]);
  });
});
