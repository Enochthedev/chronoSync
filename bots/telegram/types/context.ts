import TelegramBot from "node-telegram-bot-api";

// types/context.ts
export interface BotContext {
    bot: TelegramBot;
    msg: TelegramBot.Message;
    user?: { telegramId: string; role?: string };
  }