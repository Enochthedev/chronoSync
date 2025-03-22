import TelegramBot from 'node-telegram-bot-api';
import { isAuthorizedUser } from '../middlewares/auth.js';
import { logger } from '../utils/logger.js';
import { messageProcessors } from '../messages/index.js';
import { databaseService } from '../../../core/services/database.service.js';
import { askWithMemory } from '../../../core/ai/index.js';

export async function handleMessage(bot: TelegramBot, msg: TelegramBot.Message) {
  const userId = String(msg.from?.id);
  const username = msg.from?.username || '';

  await databaseService.addOrUpdateUser({
    telegramId: userId,
    username,
  });

  const chatId = msg.chat.id;
  const text = msg.text || '';
  const isGroup = msg.chat.type.includes('group');
  const botMentioned = text.includes('@ChronoSyncBot'); 

  logger.info(`Message from ${username}: ${text}`);

  if (!isAuthorizedUser(msg)) {
    return bot.sendMessage(chatId, '⛔ Unauthorized');
  }

  // 🧠 Try to match a command/message processor first
  const processor = messageProcessors.find((p) => p.trigger(text));
  if (processor) {
    return processor.handle(bot, msg);
  }

  // 👥 Only reply in groups if bot is mentioned
  if (isGroup && !botMentioned) return;

  // 🧠 Remove bot mention and model tag if present
  const cleanedText = text
    .replace(/@\w+/g, '') // remove @ChronoSyncBot
    .replace(/\[model:.*?\]/g, '') // remove [model:xyz]
    .trim();

  const response = await askWithMemory(text, userId, false); // pass full text so [model:xyz] works
  return bot.sendMessage(chatId, response, {
    reply_to_message_id: msg.message_id,
  });
}