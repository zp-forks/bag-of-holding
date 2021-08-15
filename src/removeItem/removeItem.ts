import { MutationResolvers, RemoveItemResult } from '../shared';

export const removeItem: MutationResolvers['removeItem'] = async (
  _,
  { itemId },
  { prisma },
): Promise<RemoveItemResult> => {
  try {
    const { campaign } = await prisma.item.delete({
      where: { id: itemId },
      include: { campaign: true },
    });

    return {
      __typename: 'Campaign',
      ...campaign,
      items: [],
    };
  } catch {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} not found`,
    };
  }
};
