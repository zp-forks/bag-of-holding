import { itemCount } from './itemCount';

const count = jest.fn();

const prisma = {
  item: {
    count,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('itemCount', () => {
  it('calls count with correct values', async () => {
    count.mockResolvedValueOnce(10);

    await itemCount!(
      {
        id: 'campaign-id',
      } as any,
      {},
      context,
      resolveInfo,
    );

    expect(count).toHaveBeenCalledWith({
      where: { campaignId: 'campaign-id' },
    });
  });

  it('returns the count', async () => {
    count.mockResolvedValueOnce(10);

    const result = await itemCount!(
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
