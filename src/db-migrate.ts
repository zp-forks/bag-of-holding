import { PrismaClient } from '@prisma/client';
import mongoose, { Document, model, Schema, Types } from 'mongoose';

interface Item extends Types.Subdocument {
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
  items: Item[];
}

const ItemSchema = new Schema<Item>({
  name: { type: String, required: true },
  description: { type: String },
  notes: { type: String },
  quantity: { type: Number },
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

mongoose
  .connect(
    'mongodb+srv://cluster0.lji5k.mongodb.net/dev?retryWrites=true&writeConcern=majority',
    {
      auth: {
        user: 'dev',
        password: 'y1PdMU9YJQaM1eDR',
      },
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  )
  .then(() => {
    console.log('Connected to database');
  });

const prisma = new PrismaClient();

CampaignModel.find().then((campaigns) => {
  campaigns.forEach((campaign) => {
    console.log('creating campaign');
    prisma.campaign
      .create({
        data: {
          name: campaign.name,
          electrum: campaign.electrum,
          // eslint-disable-next-line no-underscore-dangle
          createdAt: campaign._id.getTimestamp(),
          copper: campaign.bronze,
          gold: campaign.gold,
          platinum: campaign.platinum,
          silver: campaign.silver,
        },
      })
      .then(({ id: campaignId }) => {
        console.log(`created campaign with id ${campaignId}`);
        campaign.items.forEach((item) => {
          console.log('creating item');

          prisma.item.create({
            data: {
              // eslint-disable-next-line no-underscore-dangle
              createdAt: item._id.getTimestamp(),
              notes: item.notes,
              campaignId,
              quantity: item.quantity,
              name: item.name,
              description: item.description,
              tags: item.tags,
              updatedAt: item.updatedAt,
            },
          });
        });
      });
  });
});
