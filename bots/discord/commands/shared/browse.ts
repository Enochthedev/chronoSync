import { Client, Message } from 'discord.js';
import { puppeteerBrowse } from '../../../../core/tools/puppeteerBrowser.service';

export const browseCommand = {
  name: 'browse',
  description: 'Search the web using headless browser scraping',
  async execute(_client: Client, message: Message) {
    const query = message.content.split(' ').slice(1).join(' ');
    if (!query) return message.reply('❓ Usage: `!browse <query>`');

    const results = await puppeteerBrowse(query);
    message.reply(`🔎 Top results for: **${query}**\n\n${results.join('\n')}`);
  },
};