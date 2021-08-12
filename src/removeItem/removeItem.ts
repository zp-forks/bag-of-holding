import { MutationResolvers, RemoveItemResult } from '../shared';

export const removeItem: MutationResolvers['removeItem'] = async (
  _,
  { itemId },
  { prisma },
): Promise<RemoveItemResult> => {
  const { Campaign: campaign } = await prisma.item.delete({
    where: { id: itemId },
    include: { Campaign: true },
  });

  if (!campaign) {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} does not exist`,
    };
  }

  return {
    __typename: 'Campaign',
    ...campaign,
  };
};
