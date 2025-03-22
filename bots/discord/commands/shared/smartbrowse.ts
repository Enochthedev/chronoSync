import { Client, Message } from 'discord.js';
import { smartBrowseAndSummarize } from '../../../../core/tools/puppeteerReader.service';

export const smartBrowseCommand = {
  name: 'smartbrowse',
  description: 'Search and summarize the top result using AI',
  async execute(_client: Client, message: Message) {
    const query = message.content.split(' ').slice(1).join(' ');
    if (!query) return message.reply('❓ Usage: `!smartbrowse <query>`');

    const response = await smartBrowseAndSummarize(query);
    message.reply(response);
  },
};