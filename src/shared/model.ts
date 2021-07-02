import { Document, model, Schema, Types } from 'mongoose';

interface Item extends Types.Subdocument {
  name: string;
  description?: string;
}

interface Campaign extends Document {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  items: Item[];
}

const ItemSchema = new Schema<Item>({
  name: { type: String, required: true },
  description: { type: String },
});

const CampaignSchema = new Schema<Campaign>({
  name: { type: String, required: true },
  gold: { type: Number, required: true },
  silver: { type: Number, required: true },
  bronze: { type: Number, required: true },
  items: [ItemSchema],
});

export const CampaignModel = model<Campaign>('Campaign', CampaignSchema);
