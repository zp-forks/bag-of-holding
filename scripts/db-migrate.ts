/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import mongoose, { Document, model, Schema, Types } from 'mongoose';
import { config } from 'dotenv';

config();

interface Item extends Types.Subdocument {
  name: string;
  description?: string;
  quantity?: number;
  notes?: string;
  tags?: string[];
  updatedAt?: Date;
}

interface PersistedCampaign extends Document {
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

const CampaignModel = model<PersistedCampaign>('Campaign', CampaignSchema);

async function migrate() {
  const prisma = new PrismaClient();
  await mongoose.connect(process.env.MONGO_CONNECTION || '', {
    auth: {
      user: process.env.MONGO_USER || '',
      password: process.env.MONGO_PASSWORD || '',
    },
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log('Connected to mongo');

  await prisma.$connect();

  console.log('Connected to postgres');

  const campaigns = await CampaignModel.find();

  for (const campaign of campaigns) {
    console.log('creating campaign');
    const newCampaign = await prisma.campaign.create({
      data: {
        name: campaign.name,
        electrum: campaign.electrum,
        copper: campaign.bronze,
        gold: campaign.gold,
        platinum: campaign.platinum,
        silver: campaign.silver,
      },
    });

    console.log(`created campaign ${newCampaign.id}`);

    for (const item of campaign.items) {
      console.log(`creating item in campaign ${newCampaign.id}`);

      const newItem = await prisma.item.create({
        data: {
          // eslint-disable-next-line no-underscore-dangle
          createdAt: item._id.getTimestamp(),
          notes: item.notes,
          campaignId: newCampaign.id,
          quantity: item.quantity,
          name: item.name,
          description: item.description,
          tags: item.tags,
          updatedAt: item.updatedAt,
        },
      });

      console.log(`created item ${newItem.id}`);
    }
  }

  console.log('shutting down db connections');
  await mongoose.disconnect();
  await prisma.$disconnect();
  console.log('disconnected from dbs');
}

migrate();
