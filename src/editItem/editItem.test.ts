import { editItem } from './editItem';

const update = jest.fn();

const prisma = {
  item: {
    update,
  },
} as any;

const resolveInfo: any = {};

Date.now = jest.fn().mockReturnValue(1);

describe('editItem', () => {
  it('calls update with correct values', async () => {
    await editItem!(
      {},
      {
        itemId: 'item-id',
        input: { name: 'new item', quantity: 2, tags: [] },
      },
      { prisma },
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        name: 'new item',
        quantity: 2,
        tags: [],
        updatedAt: new Date(1),
      },
      where: { id: 'item-id' },
    });
  });

  it('ensures quantity and tags will not be set to null when not provided', async () => {
    await editItem!(
      {},
      {
        itemId: 'item-id',
        input: { name: 'new item' },
      },
      { prisma },
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        name: 'new item',
        quantity: undefined,
        tags: undefined,
        updatedAt: new Date(1),
      },
      where: { id: 'item-id' },
    });
  });

  it('returns item not found when db call throws', async () => {
    update.mockRejectedValueOnce(new Error());

    const result = await editItem!(
      {},
      {
        itemId: 'item-id',
        input: { name: 'new item' },
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'ItemNotFound',
      message: 'Item with ID item-id not found',
    });
  });

  it('returns an item', async () => {
    update.mockResolvedValueOnce({ name: 'name' });

    const result = await editItem!(
      {},
      { itemId: 'item-id', input: { name: 'new item' } },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({ __typename: 'Item', name: 'name' });
  });
});
