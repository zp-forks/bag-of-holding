import { campaignCount } from './campaignCount';

const count = jest.fn();

const prisma = {
  campaign: {
    count,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('campaignCount', () => {
  it('calls count with correct values', async () => {
    count.mockResolvedValueOnce(10);

    await campaignCount!(
      {
        id: 'user-id',
      } as any,
      {},
      context,
      resolveInfo,
    );

    expect(count).toHaveBeenCalledWith({
      where: { users: { some: { id: 'user-id' } } },
    });
  });

  it('returns the count', async () => {
    count.mockResolvedValueOnce(10);

    const result = await campaignCount!(
      {
        id: 'user-id',
      } as any,
      {},
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual(10);
  });
});
