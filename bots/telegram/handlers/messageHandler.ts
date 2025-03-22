import TelegramBot from 'node-telegram-bot-api';
import { isAuthorizedUser } from '../middlewares/auth';
import { logger } from '../utils/logger';
import { messageProcessors } from '../messages';
import { databaseService } from '../../../core/services/database.service';

export async function handleMessage(bot: TelegramBot, msg: TelegramBot.Message) {
  const userId = String(msg.from?.id);
  const username = msg.from?.username;

  await databaseService.addOrUpdateUser({
    telegramId: userId,
    username,
  });

  const chatId = msg.chat.id;
  const text = msg.text || '';

  logger.info(`Message from ${msg.from?.username}: ${text}`);

  if (!isAuthorizedUser(msg)) {
    return bot.sendMessage(chatId, '⛔ Unauthorized');
  }

  const processor = messageProcessors.find((p) => p.trigger(text));
  if (processor) {
    return processor.handle(bot, msg);
  }

  // Shouldn't reach here, but just in case
  bot.sendMessage(chatId, `🤔 Message received.`);
}