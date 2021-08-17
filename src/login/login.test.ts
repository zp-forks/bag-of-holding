import { login } from './login';

const upsert = jest.fn();

const prisma = {
  user: {
    upsert,
  },
} as any;

const resolveInfo: any = {};
const context = { prisma, userId: '123' };

describe('login', () => {
  it('creates or updates user record', async () => {
    upsert.mockResolvedValueOnce({
      externalId: 'a@b.com',
      campaigns: [],
    });

    await login!(
      {},
      {
        externalId: 'a@b.com',
      },
      context,
      resolveInfo,
    );

    expect(upsert).toHaveBeenCalledWith({
      where: {
        externalId: 'a@b.com',
      },
      create: {
        externalId: 'a@b.com',
        lastLogin: expect.any(Date),
      },
      update: {
        lastLogin: expect.any(Date),
      },
    });
  });
});
