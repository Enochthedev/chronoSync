import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const databaseService = {
    async addOrUpdateUser({
      telegramId,
      discordId,
      username,
    }: {
      telegramId?: string;
      discordId?: string;
      username?: string;
    }) {
      let existingUser = null;
  
      if (telegramId) {
        existingUser = await prisma.user.findUnique({ where: { telegramId } });
      } else if (discordId) {
        existingUser = await prisma.user.findUnique({ where: { discordId } });
      }
  
      if (existingUser) {
        return prisma.user.update({
          where: { id: existingUser.id },
          data: {
            telegramId: telegramId ?? existingUser.telegramId,
            discordId: discordId ?? existingUser.discordId,
            username: username ?? existingUser.username,
          },
        });
      }
  
      return prisma.user.create({
        data: {
          telegramId,
          discordId,
          username,
        },
      });
    },
  
    async getAllUsers() {
      return prisma.user.findMany();
    },
  
    async getUserByTelegramId(id: string) {
      return prisma.user.findUnique({ where: { telegramId: id } });
    },
  
    async getUserByDiscordId(id: string) {
      return prisma.user.findUnique({ where: { discordId: id } });
    },
  };