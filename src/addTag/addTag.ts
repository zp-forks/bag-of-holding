import { AddTagResult, logger, MutationResolvers } from '../shared';

export const addTag: MutationResolvers['addTag'] = async (
  _,
  { itemId, tag },
  { prisma },
): Promise<AddTagResult> => {
  const item = await prisma.item.update({
    data: { tags: { push: tag } },
    where: { id: itemId },
  });

  if (!item) {
    return {
      __typename: 'ItemNotFound',
      message: `Item with ID ${itemId} not found`,
    };
  }

  logger.info(`Added tag to item ${itemId}`);

  return {
    __typename: 'Item',
    ...item,
  };
};
