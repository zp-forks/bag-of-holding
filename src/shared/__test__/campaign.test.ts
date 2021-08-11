import mongoose from 'mongoose';
import { mapDatabaseModelToGql } from '../campaign';

const campaignId = '56cb91bdc3464f14678934ca';
const mongooseCampaignId = new mongoose.Types.ObjectId(campaignId);

const itemId = '61141110bbb57a7214e5dd5f';
const mongooseItemId = new mongoose.Types.ObjectId(itemId);

const creationDates: Record<string, string> = {
  [campaignId]: '2016-02-22T22:54:53.000Z',
  [itemId]: '2021-08-11T18:04:00.000Z',
};

const fullInput = {
  _id: mongooseCampaignId,
  name: 'Campaign name',
  electrum: 1,
  platinum: 2,
  gold: 3,
  silver: 4,
  bronze: 5,
  items: [
    {
      _id: mongooseItemId,
      name: 'item-1',
      notes: 'notes',
      description: 'description',
      quantity: 5,
      tags: ['tag'],
      updatedAt: new Date(0),
    },
  ],
} as any;

const missingQuantityInput = {
  _id: mongooseCampaignId,
  name: 'Campaign name',
  electrum: 1,
  platinum: 2,
  gold: 3,
  silver: 4,
  bronze: 5,
  items: [
    {
      _id: mongooseItemId,
      name: 'item-1',
      description: 'description',
      tags: ['tag'],
      updatedAt: new Date(0),
    },
  ],
} as any;

const zeroQuantityItemInput = {
  _id: mongooseCampaignId,
  name: 'Campaign name',
  electrum: 1,
  platinum: 2,
  gold: 3,
  silver: 4,
  bronze: 5,
  items: [
    {
      _id: mongooseItemId,
      name: 'item-1',
      description: 'description',
      quantity: 0,
      tags: ['tag'],
      updatedAt: new Date(0),
    },
  ],
} as any;

describe('campaign', () => {
  it('maps a database model to the GQL model', () => {
    const output = mapDatabaseModelToGql(fullInput);

    expect(output).toStrictEqual({
      __typename: 'Campaign',
      electrum: 1,
      platinum: 2,
      gold: 3,
      silver: 4,
      copper: 5,
      items: [
        {
          __typename: 'Item',
          id: mongooseItemId,
          name: 'item-1',
          description: 'description',
          quantity: 5,
          notes: 'notes',
          tags: ['tag'],
          createdAt: creationDates[itemId],
          updatedAt: '1970-01-01T00:00:00.000Z',
        },
      ],
      name: 'Campaign name',
      id: mongooseCampaignId,
      createdAt: creationDates[campaignId],
    });
  });

  it('populates quantity with 1 when database item has no quantity', () => {
    const output = mapDatabaseModelToGql(missingQuantityInput);

    expect(output.items[0].quantity).toStrictEqual(1);
  });

  it('populates quantity with 0 when database item quantity is 0', () => {
    const output = mapDatabaseModelToGql(zeroQuantityItemInput);

    expect(output.items[0].quantity).toStrictEqual(0);
  });

  it('maps an item without description', () => {
    const input = {
      ...fullInput,
      items: [{ _id: mongooseItemId, name: 'item-1' }],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output.items[0].description).toStrictEqual(undefined);
  });

  it('maps an item without notes', () => {
    const input = {
      ...fullInput,
      items: [{ _id: mongooseItemId, name: 'item-1' }],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output.items[0].notes).toStrictEqual(undefined);
  });

  it('maps an item without tags', () => {
    const input = {
      ...fullInput,
      items: [{ _id: mongooseItemId, name: 'item-1', notes: 'notes' }],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output.items[0].tags).toStrictEqual([]);
  });

  it('maps an item no updated date', () => {
    const input = {
      ...fullInput,
      items: [{ _id: mongooseItemId, name: 'item-1', notes: 'notes' }],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output.items[0].updatedAt).toStrictEqual(undefined);
  });

  it('handles undefined money values sensible', () => {
    const input = {
      _id: mongooseCampaignId,
      name: 'Campaign name',
      items: [],
    } as any;

    const output = mapDatabaseModelToGql(input);

    expect(output).toStrictEqual({
      __typename: 'Campaign',
      electrum: 0,
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
      items: [],
      name: 'Campaign name',
      id: mongooseCampaignId,
      createdAt: creationDates[campaignId],
    });
  });
});
