import { removeTag } from './removeTag';

const update = jest.fn();
const findUnique = jest.fn();

const prisma = {
  item: {
    update,
    findUnique,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, accessToken: '123' };

Date.now = jest.fn().mockReturnValue(1);

describe('removeTag', () => {
  it('calls update with correct values', async () => {
    findUnique.mockResolvedValueOnce({ name: 'item', tags: ['tag', 'tag2'] });

    await removeTag!(
      {},
      {
        itemId: 'item-id',
        tag: 'tag',
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      where: { id: 'item-id' },
      data: { tags: { set: ['tag2'] } },
    });
  });

  it('returns item not found when db call throws', async () => {
    findUnique.mockRejectedValueOnce(new Error());

    const result = await removeTag!(
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

  it('returns an item', async () => {
    findUnique.mockResolvedValueOnce({ name: 'item', tags: ['tag'] });
    update.mockResolvedValueOnce({ name: 'name' });

    const result = await removeTag!(
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
});
