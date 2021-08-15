import { addItem } from './addItem';

const create = jest.fn();

const prisma = {
  item: {
    create,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('addItem', () => {
  it('calls create with correct values', async () => {
    await addItem!(
      {},
      {
        campaignId: 'campaign-id',
        input: { name: 'new item', quantity: 2, tags: [] },
      },
      context,
      resolveInfo,
    );

    expect(create).toHaveBeenCalledWith({
      data: {
        name: 'new item',
        campaignId: 'campaign-id',
        quantity: 2,
        tags: [],
      },
      include: {
        campaign: true,
      },
    });
  });

  it('ensures quantity and tags will not be set to null when not provided', async () => {
    await addItem!(
      {},
      {
        campaignId: 'campaign-id',
        input: { name: 'new item' },
      },
      context,
      resolveInfo,
    );

    expect(create).toHaveBeenCalledWith({
      data: {
        name: 'new item',
        campaignId: 'campaign-id',
        quantity: undefined,
        tags: undefined,
      },
      include: {
        campaign: true,
      },
    });
  });

  it('returns a campaign', async () => {
    create.mockResolvedValueOnce({ campaign: { name: 'name' } });

    const result = await addItem!(
      {},
      { campaignId: 'campaign-id', input: { name: 'new item' } },
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
