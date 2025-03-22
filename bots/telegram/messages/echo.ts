import TelegramBot from 'node-telegram-bot-api';

export const echoProcessor = {
  name: 'echo',
  trigger: () => true, // fallback processor
  handle(bot: TelegramBot, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, `🔁 You said: ${msg.text}`);
  },
};