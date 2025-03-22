import { Client, Message } from 'discord.js';
import { getBotStatus } from '../../../../core/utils/statusChecker.js';
import { logger } from '../../utils/logger.js';

export const statusCommand = {
  name: 'status',
  description: 'Check bot status, uptime, DB, and AI health.',
  async execute(_client: Client, message: Message) {
    logger.info(`Command received: !status from ${message.author.username}`);

    const status = await getBotStatus();

    // ✅ Use reply instead of channel.send to avoid type issues
    message.reply(`\`\`\`\n${status}\n\`\`\``);
  },
};