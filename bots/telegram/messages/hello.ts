import TelegramBot from 'node-telegram-bot-api';

export const helloProcessor = {
  name: 'hello-response',
  trigger: (text: string) => /hello|hi|hey/i.test(text),
  handle(bot: TelegramBot, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, `👋 Hello, ${msg.from?.first_name}!`);
  },
};