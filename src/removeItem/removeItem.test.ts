import { removeItem } from './removeItem';

const deleteMock = jest.fn();

const prisma = {
  item: {
    delete: deleteMock,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, accessToken: '123' };

Date.now = jest.fn().mockReturnValue(1);

describe('removeItem', () => {
  it('calls delete with correct values', async () => {
    await removeItem!({}, { itemId: 'item-id' }, context, resolveInfo);

    expect(deleteMock).toHaveBeenCalledWith({
      where: { id: 'item-id' },
      include: { campaign: true },
    });
  });

  it('returns item not found when db call throws', async () => {
    deleteMock.mockRejectedValueOnce(new Error());

    const result = await removeItem!(
      {},
      { itemId: 'item-id' },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'ItemNotFound',
      message: 'Item with ID item-id not found',
    });
  });

  it('returns a campaign', async () => {
    deleteMock.mockResolvedValueOnce({ campaign: { name: 'name' } });

    const result = await removeItem!(
      {},
      { itemId: 'item-id' },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'Campaign',
      name: 'name',
      items: [],
    });
  });
});
