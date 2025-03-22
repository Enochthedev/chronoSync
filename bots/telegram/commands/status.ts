import TelegramBot from 'node-telegram-bot-api';
import { getBotStatus } from '../../../core/utils/statusChecker.js';

export const statusCommand = {
  name: 'status',
  description: 'Check bot status, uptime, DB, and AI health.',
  async execute(bot: TelegramBot, msg: TelegramBot.Message) {
    const status = await getBotStatus();

    bot.sendMessage(msg.chat.id, `\`\`\`\n${status}\n\`\`\``, {
      parse_mode: 'Markdown',
    });
  },
};