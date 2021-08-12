import { AddTagResult, logger, MutationResolvers } from '../shared';

export const addTag: MutationResolvers['addTag'] = async (
  _,
  { itemId, tag },
  { prisma },
): Promise<AddTagResult> => {
  try {
    const item = await prisma.item.update({
      data: { tags: { push: tag } },
      where: { id: itemId },
    });

    logger.info(`Added tag to item ${itemId}`);

    return {
      __typename: 'Item',
      ...item,
    };
  } catch {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} not found`,
    };
  }
};
