import TelegramBot from 'node-telegram-bot-api';
import { commandRegistry } from './index';

export const helpCommand = {
  name: 'help',
  description: 'List all available commands',
  execute(bot: TelegramBot, msg: TelegramBot.Message) {
    const helpText = `🧠 *Available Commands:*\n\n` + 
      commandRegistry
        .map(cmd => `/${cmd.name} - ${cmd.description || 'No description'}`)
        .join('\n');

    bot.sendMessage(msg.chat.id, helpText, { parse_mode: 'Markdown' });
  },
};