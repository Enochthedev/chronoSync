import TelegramBot from 'node-telegram-bot-api';

export const startCommand = {
  name: 'start',
  description: 'Starts the bot',
  execute(bot: TelegramBot, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, `👋 Welcome, ${msg.from?.first_name}!`);
  },
};