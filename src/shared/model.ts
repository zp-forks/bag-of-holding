import { Document, model, Schema, Types } from 'mongoose';

interface Item extends Types.Subdocument {
  name: string;
  description?: string;
  quantity?: number;
  notes?: string;
  tags?: string[];
}

export interface PersistedCampaign extends Document {
  name: string;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  items: Item[];
}

const ItemSchema = new Schema<Item>({
  name: { type: String, required: true },
  description: { type: String },
  notes: { type: String },
  quantity: { type: Number },
  tags: [{ type: String }],
});

const CampaignSchema = new Schema<PersistedCampaign>({
  name: { type: String, required: true },
  electrum: { type: Number, required: true },
  platinum: { type: Number, required: true },
  gold: { type: Number, required: true },
  silver: { type: Number, required: true },
  bronze: { type: Number, required: true },
  items: [ItemSchema],
});

export const CampaignModel = model<PersistedCampaign>(
  'Campaign',
  CampaignSchema,
);
