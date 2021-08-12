import { EditItemResult, logger, MutationResolvers } from '../shared';

export const editItem: MutationResolvers['editItem'] = async (
  _,
  { itemId, input: { quantity, tags, name, ...input } },
  { prisma },
): Promise<EditItemResult> => {
  if (quantity && quantity < 0) {
    return {
      __typename: 'InvalidInput',
      message: 'Quantity must be 0 or higher',
    };
  }

  try {
    const item = await prisma.item.update({
      data: {
        ...input,
        name: name ?? undefined,
        tags: tags ?? undefined,
        updatedAt: new Date(),
      },
      where: { id: itemId },
    });

    logger.info(`Updated item with ID ${itemId}`);

    return { __typename: 'Item', ...item };
  } catch {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} does not exist`,
    };
  }
};
