import TelegramBot from 'node-telegram-bot-api';
import { handleAskCommand } from '../../../core/handlers/askHandler';

export const askCommand = {
  name: 'ask',
  description: 'Ask the AI a question',
  execute: (bot: TelegramBot, msg: TelegramBot.Message) => {
    const prompt = msg.text?.split(' ').slice(1).join(' ');
    if (!prompt) {
      return bot.sendMessage(msg.chat.id, '❓ Please provide a prompt. Example: /ask What is AI?');
    }

    handleAskCommand(prompt, (response) => {
      bot.sendMessage(msg.chat.id, response);
    });
  },
};