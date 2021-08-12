import {
  EditItemInput,
  EditItemResult,
  logger,
  MutationResolvers,
} from '../shared';

const mapToPrisma = (input: EditItemInput) => ({
  name: input.name ?? undefined,
  description: input.description ?? undefined,
  quantity: input.quantity ?? undefined,
  notes: input.notes ?? undefined,
  tags: input.tags ?? undefined,
});

export const editItem: MutationResolvers['editItem'] = async (
  _,
  { itemId, input },
  { prisma },
): Promise<EditItemResult> => {
  if (input.quantity && input.quantity < 0) {
    return {
      __typename: 'InvalidInput',
      message: 'Quantity must be 0 or higher',
    };
  }

  try {
    const item = await prisma.item.update({
      data: mapToPrisma(input),
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
