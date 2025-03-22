import { Client, Message } from 'discord.js';
import { askAI } from '../../../../core/ai';
import { logger } from '../../utils/logger';

export const askCommand = {
  name: 'ask',
  description: 'Ask the AI a question',
  async execute(_client: Client, message: Message) {
    const prompt = message.content.split(' ').slice(1).join(' ');

    if (!prompt) {
      return message.reply('❓ Usage: `!ask <your question>`');
    }

    logger.info(`AI asked: ${prompt} by ${message.author.username}`);

    try {
      const response = await askAI(prompt);
      message.reply(`💬 ${response}`);
    } catch (err) {
      logger.error(`AI Error: ${err}`);
      message.reply('⚠️ AI is currently unavailable.');
    }
  },
};