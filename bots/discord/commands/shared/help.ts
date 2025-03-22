import { Client, Message } from 'discord.js';
import { commandRegistry } from '../index';

export const helpCommand = {
  name: 'help',
  description: 'Lists all available commands',
  execute: (client: Client, message: Message) => {
    const helpText = commandRegistry
      .map(cmd => `**!${cmd.name}** – ${cmd.description || 'No description'}`)
      .join('\n');

    message.reply({
      content: `📖 **Available Commands:**\n${helpText}`,
    });
  },
};