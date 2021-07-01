import mongoose from 'mongoose';
import { Campaign } from './__generated__/schema-types';

type PersistedCampaign = Omit<Campaign, '__typename'> & mongoose.Document;

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const CampaignSchema = new mongoose.Schema({
  name: { type: String },
  gold: { type: Number },
  silver: { type: Number },
  bronze: { type: Number },
  items: [ItemSchema],
});

export const CampaignModel = mongoose.model<PersistedCampaign>(
  'Campaign',
  CampaignSchema
);
