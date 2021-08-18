import { createCampaign } from './createCampaign';

const create = jest.fn();

const prisma = {
  campaign: {
    create,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('createCampaign', () => {
  it('calls create with correct values', async () => {
    create.mockResolvedValueOnce({ id: 'campaign-id' });

    await createCampaign!(
      {},
      {
        name: 'new campaign',
      },
      context,
      resolveInfo,
    );

    expect(create).toHaveBeenCalledWith({
      data: { name: 'new campaign', users: { connect: { id: '123' } } },
    });
  });

  it('returns a created campaign', async () => {
    create.mockResolvedValueOnce({ id: 'campaign-id' });

    const result = await createCampaign!(
      {},
      {
        name: 'new campaign',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'Campaign',
      id: 'campaign-id',
      itemCount: 0,
      items: [],
      userCount: 0,
      users: [],
    });
  });

  it('returns invalid input if user not found', async () => {
    create.mockRejectedValueOnce({ id: 'campaign-id' });

    const result = await createCampaign!(
      {},
      {
        name: 'new campaign',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'InvalidInput',
      message: 'You need to be signed in to create a campaign',
    });
  });
});
