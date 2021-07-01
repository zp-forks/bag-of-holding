import mongoose from 'mongoose';

type Item = {
  name: string;
  description?: string;
};

type Campaign = {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  items: Item[];
};

type PersistedCampaign = Campaign & mongoose.Document;

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gold: { type: Number, required: true },
  silver: { type: Number, required: true },
  bronze: { type: Number, required: true },
  items: [ItemSchema],
});

export const CampaignModel = mongoose.model<PersistedCampaign>(
  'Campaign',
  CampaignSchema
);
