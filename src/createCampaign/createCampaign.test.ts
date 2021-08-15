import { createCampaign } from './createCampaign';

const create = jest.fn();

const prisma = {
  campaign: {
    create,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, accessToken: '123' };

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

    expect(create).toHaveBeenCalledWith({ data: { name: 'new campaign' } });
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
      __typename: 'CreatedCampaign',
      id: 'campaign-id',
    });
  });
});
