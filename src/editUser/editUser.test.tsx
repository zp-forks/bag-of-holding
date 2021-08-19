import { editUser } from './editUser';

const update = jest.fn();

const prisma = {
  user: {
    update,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

Date.now = jest.fn().mockReturnValue(1);

describe('editItem', () => {
  afterEach(() => jest.resetAllMocks());
  it('calls update with correct values', async () => {
    await editUser!(
      {},
      {
        input: { username: 'new username', imageUrl: 'new image' },
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {
        username: 'new username',
        imageUrl: 'new image',
      },
      where: { id: '123' },
    });
  });

  it('ensures username and imageUrl are not set to null when not defined', async () => {
    await editUser!(
      {},
      {
        input: {},
      },
      context,
      resolveInfo,
    );

    expect(update).toHaveBeenCalledWith({
      data: {},
      where: { id: '123' },
    });
  });

  it('returns user not found when db call throws', async () => {
    update.mockRejectedValueOnce(new Error());

    const result = await editUser!(
      {},
      {
        input: { username: 'new username' },
      },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'UserNotFound',
      message: 'User with ID 123 not found',
    });
  });

  it('returns an item', async () => {
    update.mockResolvedValueOnce({ username: 'new username' });

    const result = await editUser!(
      {},
      { input: { username: 'new username' } },
      context,
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'User',
      username: 'new username',
      campaigns: [],
      campaignCount: 0,
    });
  });
});
