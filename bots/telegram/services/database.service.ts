import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const databaseService = {
  async addUser(telegramId: string, username?: string) {
    return prisma.user.upsert({
      where: { telegramId },
      update: {},
      create: { telegramId, username },
    });
  },

  async getAllUsers() {
    return prisma.user.findMany();
  },

  async userExists(telegramId: string) {
    return prisma.user.findUnique({ where: { telegramId } });
  },
};