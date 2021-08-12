import { AddTagResult, logger, MutationResolvers } from '../shared';

export const removeTag: MutationResolvers['addTag'] = async (
  _,
  { itemId, tag },
  { prisma },
): Promise<AddTagResult> => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      rejectOnNotFound: true,
    });

    const newTags = item.tags.filter((t) => t !== tag);

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { tags: { set: newTags } },
    });

    logger.info(`Removed tag from item ${itemId}`);

    return { __typename: 'Item', ...updatedItem };
  } catch {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} not found`,
    };
  }
};
