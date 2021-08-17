import { addUser } from './addUser';

const update = jest.fn();

const prisma = {
  campaign: {
    update,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('addUser', () => {
  it('calls update with correct values', async () => {
    prisma.campaign.update.mockReturnValue({ name: 'Campaign name' });
    await addUser!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: { users: { connect: { id: '123' } } },
      where: { id: 'campaign-id' },
    });
  });

  it('returns a campaign', async () => {
    prisma.campaign.update.mockReturnValue({ name: 'Campaign name' });
    const result = await addUser!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'Campaign',
      name: 'Campaign name',
      items: [],
      users: [],
      itemCount: 0,
      userCount: 0,
    });
  });

  it('returns user not found when connection fails', async () => {
    update.mockRejectedValue({ code: 'P2025' });
    const result = await addUser!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'UserNotFound',
      message: 'User with ID 123 not found',
    });
  });

  it('returns campaign not found when other errors are thrown', async () => {
    update.mockRejectedValue(new Error());
    const result = await addUser!(
      {},
      {
        campaignId: 'campaign-id',
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'CampaignNotFound',
      message: 'Campaign with ID campaign-id not found',
    });
  });
});
