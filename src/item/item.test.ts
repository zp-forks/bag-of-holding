import { fetchItem } from './item';

const findUnique = jest.fn();

const prisma = {
  item: {
    findUnique,
  },
} as any;

const resolveInfo: any = {};

describe('item', () => {
  it('calls find unique with correct values', async () => {
    await fetchItem!(
      {},
      {
        itemId: 'item-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'item-id' },
      rejectOnNotFound: true,
    });
  });

  it('returns a item', async () => {
    findUnique.mockResolvedValueOnce({ name: 'name' });

    const result = await fetchItem!(
      {},
      {
        itemId: 'item-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({ __typename: 'Item', name: 'name' });
  });

  it('returns a item not found when db call throws', async () => {
    findUnique.mockRejectedValueOnce(new Error());

    const result = await fetchItem!(
      {},
      {
        itemId: 'item-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'ItemNotFound',
      message: 'Item with ID item-id not found',
    });
  });
});
