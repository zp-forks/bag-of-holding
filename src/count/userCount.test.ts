import { userCount } from './userCount';

const count = jest.fn();

const prisma = {
  user: {
    count,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('userCount', () => {
  it('calls count with correct values', async () => {
    count.mockResolvedValueOnce(10);

    await userCount!(
      {
        id: 'campaign-id',
      } as any,
      {},
      context,
      resolveInfo,
    );

    expect(count).toHaveBeenCalledWith({
      where: { campaigns: { some: { id: 'campaign-id' } } },
    });
  });

  it('returns the count', async () => {
    count.mockResolvedValueOnce(10);

    const result = await userCount!(
      {
        id: 'campaign-id',
      } as any,
      {},
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual(10);
  });
});
