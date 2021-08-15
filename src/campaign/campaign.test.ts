import { fetchCampaign } from './campaign';

const findUnique = jest.fn();

const prisma = {
  campaign: {
    findUnique,
  },
} as any;

const resolveInfo: any = {};

describe('campaign', () => {
  it('calls find unique with correct values', async () => {
    await fetchCampaign!(
      {},
      {
        campaignId: 'campaign-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'campaign-id' },
      rejectOnNotFound: true,
    });
  });

  it('returns a campaign', async () => {
    findUnique.mockResolvedValueOnce({ name: 'name' });

    const result = await fetchCampaign!(
      {},
      {
        campaignId: 'campaign-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'Campaign',
      name: 'name',
      items: [],
    });
  });

  it('returns a campaign not found when db call throws', async () => {
    findUnique.mockRejectedValueOnce(new Error());

    const result = await fetchCampaign!(
      {},
      {
        campaignId: 'campaign-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'CampaignNotFound',
      message: 'Campaign with ID campaign-id not found',
    });
  });
});
