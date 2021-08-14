import { AddTagResult, logger, MutationResolvers } from '../shared';

export const addTag: MutationResolvers['addTag'] = async (
  _,
  { itemId, tag },
  { prisma },
): Promise<AddTagResult> => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
      rejectOnNotFound: true,
    });

    const tagSet = new Set(item.tags);

    tagSet.add(tag);

    const savedItem = await prisma.item.update({
      data: { tags: { set: [...tagSet] } },
      where: { id: itemId },
    });

    logger.info(`Added tag to item ${itemId}`);

    return {
      __typename: 'Item',
      ...savedItem,
    };
  } catch {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} not found`,
    };
  }
};
