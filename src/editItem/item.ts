import { EditItemInput } from '../shared';
import { PersistedCampaign } from '../shared/model';

export const modifyItem = (
  items: PersistedCampaign['items'],
  { id: itemId, ...modifications }: EditItemInput,
) => {
  const itemToModify = items.find(
    // eslint-disable-next-line no-underscore-dangle
    (item) => item._id.toString() === itemId,
  );

  if (itemToModify) Object.assign(itemToModify, { ...modifications });

  return itemToModify;
};
