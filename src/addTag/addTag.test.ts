import { addTag } from './addTag';

const update = jest.fn();

const prisma = {
  item: {
    update,
  },
} as any;

const resolveInfo: any = {};

describe('addTag', () => {
  it('calls update with correct values', async () => {
    await addTag!(
      {},
      {
        itemId: 'item-id',
        tag: 'tag',
      },
      { prisma },
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: { tags: { push: 'tag' } },
      where: { id: 'item-id' },
    });
  });

  it('returns an item', async () => {
    update.mockResolvedValueOnce({ name: 'name' });

    const result = await addTag!(
      {},
      {
        itemId: 'item-id',
        tag: 'tag',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({ __typename: 'Item', name: 'name' });
  });

  it('returns an item not found when db call throws', async () => {
    update.mockRejectedValueOnce(new Error());

    const result = await addTag!(
      {},
      {
        itemId: 'item-id',
        tag: 'tag',
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
