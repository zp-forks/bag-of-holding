import { MutationResolvers } from 'shared';

export const removeItem: MutationResolvers['removeItem'] = async (
  _,
  { itemId },
  { prisma },
) => {
  try {
    const { campaign } = await prisma.item.delete({
      where: { id: itemId },
      include: { campaign: true },
    });

    return {
      __typename: 'Campaign',
      ...campaign,
      items: [],
      users: [],
    };
  } catch {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} not found`,
    };
  }
};
