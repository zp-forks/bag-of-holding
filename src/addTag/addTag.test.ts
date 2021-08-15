import { addTag } from './addTag';

const update = jest.fn();

const prisma = {
  item: {
    findUnique: jest.fn(),
    update,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, accessToken: '123' };

describe('addTag', () => {
  it('calls update with correct values', async () => {
    prisma.item.findUnique.mockReturnValue({ tags: [] });
    await addTag!(
      {},
      {
        itemId: 'item-id',
        tag: 'tag',
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: { tags: { set: ['tag'] } },
      where: { id: 'item-id' },
    });
  });

  it('does not duplicate tags', async () => {
    prisma.item.findUnique.mockReturnValue({ tags: ['tag', 'tag-2'] });

    await addTag!(
      {},
      {
        itemId: 'item-id',
        tag: 'tag-2',
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: { tags: { set: ['tag', 'tag-2'] } },
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
      context,
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
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'ItemNotFound',
      message: 'Item with ID item-id not found',
    });
  });
});
