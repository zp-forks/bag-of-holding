import { listItems } from './items';

const findMany = jest.fn();

const prisma = {
  item: {
    findMany,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('items', () => {
  it('calls find many with correct values', async () => {
    findMany.mockResolvedValueOnce([]);

    await listItems!(
      { id: 'campaign-id' } as any,
      {
        itemId: 'item-id',
      },
      context,
      resolveInfo,
    );

    expect(findMany).toHaveBeenCalledWith({
      where: { campaignId: 'campaign-id' },
    });
  });

  it('returns a list of items', async () => {
    findMany.mockResolvedValueOnce([{ name: 'name' }, { name: 'name2' }]);

    const result = await listItems!(
      { id: 'campaign-id' } as any,
      {
        itemId: 'item-id',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual([
      { __typename: 'Item', name: 'name' },
      { __typename: 'Item', name: 'name2' },
    ]);
  });
});
