import { editItem } from './editItem';

const update = jest.fn();

const prisma = {
  item: {
    update,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

Date.now = jest.fn().mockReturnValue(1);

describe('editItem', () => {
  it('calls update with correct values', async () => {
    await editItem!(
      {},
      {
        itemId: 'item-id',
        input: { name: 'new item', quantity: 2, tags: [] },
      },
      context,
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

  it('ensures quantity, tags and name will not be set to null when not provided', async () => {
    await editItem!(
      {},
      {
        itemId: 'item-id',
        input: {},
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        name: undefined,
        quantity: undefined,
        tags: undefined,
        updatedAt: new Date(1),
      },
      where: { id: 'item-id' },
    });
  });

  it('can set values to null', async () => {
    await editItem!(
      {},
      {
        itemId: 'item-id',
        input: { description: null },
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        description: null,
        name: undefined,
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
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'ItemNotFound',
      message: 'Item with ID item-id not found',
    });
  });

  it('returns invalid input when quantity is less than 0', async () => {
    const result = await editItem!(
      {},
      {
        itemId: 'item-id',
        input: { name: 'new item', quantity: -1 },
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'InvalidInput',
      message: 'Quantity must be 0 or higher',
    });
  });

  it('returns an item', async () => {
    update.mockResolvedValueOnce({ name: 'name' });

    const result = await editItem!(
      {},
      { itemId: 'item-id', input: { name: 'new item' } },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({ __typename: 'Item', name: 'name' });
  });
});
