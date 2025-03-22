import { logger } from '../../utils/logger.js';
import { Client, Message } from 'discord.js';
import { askWithMemory } from '../../../../core/ai/index.js';

export const askCommand = {
  name: 'ask',
  description: 'Ask the AI a question (with memory)',
  execute: async (client: Client, message: Message) => {
    logger.info(`Received message: ${message.content}`);
    const input = message.content.split(' ').slice(1).join(' ');
    if (!input) return message.reply('❓ Please provide a question.');
    const response = await askWithMemory(input, message.author.id);
    message.reply(response);
  },
};