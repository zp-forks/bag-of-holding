/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';

async function cleanDB() {
  const prisma = new PrismaClient();

  await prisma.$connect();

  console.log('Connected to postgres');

  console.log('deleting items');

  await prisma.item.deleteMany();

  console.log('deleting campaigns');

  await prisma.campaign.deleteMany();

  console.log('shutting down db connections');
  await prisma.$disconnect();
  console.log('disconnected from dbs');
}

cleanDB();
