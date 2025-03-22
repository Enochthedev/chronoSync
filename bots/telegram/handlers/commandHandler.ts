import TelegramBot from 'node-telegram-bot-api';
import { isAuthorizedUser } from '../middlewares/auth';
import { logger } from '../utils/logger';
import { commandRegistry } from '../commands';

export async function handleCommand(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const [commandName] = text.slice(1).split(' '); // remove '/' and split

  logger.info(`Command received: /${commandName} from ${msg.from?.username}`);

  if (!isAuthorizedUser(msg)) {
    return bot.sendMessage(chatId, '⛔ Unauthorized');
  }

  const command = commandRegistry.find((cmd) => cmd.name === commandName);

  if (!command) {
    return bot.sendMessage(chatId, `🤖 Unknown command. Try /help.`);
  }

  // Execute the matching command
  await command.execute(bot, msg);
}