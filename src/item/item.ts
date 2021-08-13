import { FetchItemResult, logger, QueryResolvers } from '../shared';

export const fetchItem: QueryResolvers['item'] = async (
  _,
  { itemId },
  { prisma },
): Promise<FetchItemResult> => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      rejectOnNotFound: true,
    });

    logger.info(`Fetched item ${itemId}`);

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
