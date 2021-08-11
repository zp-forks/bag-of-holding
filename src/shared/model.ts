import { Document, model, Schema, Types } from 'mongoose';

export interface PersistedItem extends Types.Subdocument {
  name: string;
  description?: string;
  quantity?: number;
  notes?: string;
  tags?: string[];
  updatedAt?: Date;
}

export interface PersistedCampaign extends Document {
  name: string;
  electrum: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  items: PersistedItem[];
}

const ItemSchema = new Schema<PersistedItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    notes: { type: String },
    quantity: { type: Number },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

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
