import TelegramBot from 'node-telegram-bot-api';
import { askWithMemory } from '../../../core/ai';

export const askCommand = {
  name: 'ask',
  description: 'Ask the AI a question (with smart browsing)',
  async execute(bot: TelegramBot, msg: TelegramBot.Message) {
    const input = msg.text?.split(' ').slice(1).join(' ');
    const chatId = msg.chat.id;

    if (!input) {
      return bot.sendMessage(chatId, '❓ Please provide a question.');
    }

    const response = await askWithMemory(input, msg.from?.id.toString() || 'unknown', false);
    bot.sendMessage(chatId, response);
  },
};