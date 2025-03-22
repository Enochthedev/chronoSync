import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const databaseService = {
  async addUser(discordId: string, username?: string) {
    return prisma.user.upsert({
      where: { discordId },
      update: {},
      create: { discordId, username },
    });
  },

  async getAllUsers() {
    return prisma.user.findMany();
  },

  async userExists(discordId: string) {
    return prisma.user.findUnique({ where: { discordId } });
  },
};